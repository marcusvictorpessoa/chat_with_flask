from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bananinha'
io = SocketIO(app)

@app.route("/")
def home():
    return render_template("chat.html")

@io.on('sendMessage')
def send_message_handle(msg):
    emit('getMessage', msg, broadcast=True, json=True)

if __name__ == "__main__":
    io.run(app, debug=True)