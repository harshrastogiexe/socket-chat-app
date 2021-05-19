const socket = io();

class MessageBox {
  constructor() {
    this.$messageBox = document.querySelector('.message-box');
  }

  addUserMessage(message) {
    const messageBody = `<div class="message user-message">${message}</div>`;
    this.$messageBox.innerHTML += messageBody;
  }

  addRecipientMessage(message) {
    const messageBody = `<div class="message recipient-message">${message}</div>`;
    this.$messageBox.innerHTML += messageBody;
  }
}

class TextBox {
  constructor() {
    this.$formElement = document.querySelector('form.chat-form');
    this.$textBox = document.querySelector('input[name="message"');
  }

  get message() {
    return this.$textBox.value;
  }

  set message(text = '') {
    this.$textBox.value = text;
  }

  sendMessage() {
    const messageValue = this.$textBox.value;
    const socketData = {
      value: messageValue,
      time: new Date().getTime(),
    };

    socket.emit('user/Message', socketData, (response) => {
      if (response.ok) $messageBox.addUserMessage(response.message.value);
    });
    this.message = '';
  }
}
const $sendMessage = document.querySelector('button#sendMessage');
const $messageBox = new MessageBox();
const chat = new TextBox();
//////////---------------------------------------------------

const main = () => {
  $sendMessage.addEventListener('click', (e) => {
    e.preventDefault();
    if (!chat.message) return;

    chat.sendMessage();
  });
};
main();
///////////////////////////////////////////////
const $statusMessage = document.querySelector('.connctionStatus');
const connectionHandler = ({ connected }) => {
  if (connected) {
    $statusMessage.innerHTML = 'Connected';
    $statusMessage.style.backgroundColor = '#4a148c';
    return;
  }
  $statusMessage.innerHTML = 'Disconnected';
  $statusMessage.style.backgroundColor = 'red';
};
////////////////////////////////////////////////////////////////////

// socket

socket.on('status/Connection', (status) => {
  connectionHandler(status);
  console.log(status);
});

socket.on('user/newMessage', (message) => {
  $messageBox.addRecipientMessage(message.value);
});
