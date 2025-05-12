 const socket = io('http://192.168.43.100');

const usernameInput = document.getElementById('usernameInput');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!username || !message) {
    alert("Enter both name and message!");
    return;
  }

  const data = {
    user: username,
    message: message,
    time: new Date().toLocaleTimeString()
  };

  socket.emit('send_message', data);
  appendMessage(data, true);
  messageInput.value = '';
});

socket.on('receive_message', (data) => {
  appendMessage(data, false);
});

function appendMessage(data, isOwnMessage) {
  const msgDiv = document.createElement('div');
  msgDiv.className = isOwnMessage ? 'message own' : 'message other';
  msgDiv.innerHTML = `<strong>${data.user}</strong> [${data.time}]: ${data.message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
