

window.onload = function(){
    socket = io('http://localhost:5000/');

    function addMsgToChat(msg){
        const span = document.createElement("span");
        const messages = document.querySelector(".messages");
        span.innerHTML = `${msg.name}: ${msg.message}`;
        messages.append(span);
    }

    socket.on('connect', () => {
        socket.send('Usuário conectado no socket!');
    });

    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault();

        socket.emit('sendMessage', {
            name: event.target[0].value,
            message: event.target[1].value
        });

        event.target[1].value = ""
    });

    socket.on('getMessage', (msg) => {
        addMsgToChat(msg);
    });

    socket.on('messages', (msgs) => {
        console.log(msgs);
    });
}