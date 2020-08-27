// DOM queris
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.user-message');
const newNameForm = document.querySelector('.user-appearence');
const updateMsg = document.querySelector('.update-msg');
const changePicture = document.querySelector('.change-picture');
const rooms = document.querySelector('.chatrooms');
const loader = document.querySelector('.loader');

// Availables profiles picture
const pictures = ['butterfly', 'cat', 'dog', 'dolphin', 'firefly', 'owl', 'panda', 'penguin', 'sealion', 'squirrel'];

// Add a new chat
newChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  if (message) {
    chatroom
      .addChat(message)
      .then(() => newChatForm.reset())
      .catch((err) => console.log(err));
  }
});

// Update username
newNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = newNameForm.username.value.trim();
  if (newName) {
    chatroom.updateName(newName);
    // Show and hide update message
    updateMsg.innerText = `Your name was updated to ${newName}`;
    updateMsg.classList.toggle('show');
    setTimeout(() => {
      updateMsg.classList.toggle('show');
      updateMsg.innerText = '';
    }, 2000);
  }
});

// Show loader
const showLoader = () => {
  loader.classList.add('show');
  chatList.classList.add('hide');
  setTimeout(() => {
    loader.classList.remove('show');
    chatList.classList.remove('hide');
    window.scrollTo(0, document.body.scrollHeight);
  }, 2000);
};

// Change user profile pictures
changePicture.addEventListener('click', () => {
  const picture = pictures[Math.floor(Math.random() * pictures.length)];
  chatroom.updateProfile(picture);
  document.querySelector('.user-appearence .avatar').setAttribute('src', `img/avatars/${picture}.png`);
});

//Change room
rooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.id);
    chatroom.getChats((chat) => chatUI.render(chat));
    showLoader();
    // Change button class
    rooms.querySelectorAll('button').forEach((button) => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      }
    });
    e.target.classList.add('active');
  }
});

// Check LocalStorage for name nad profile
const username = localStorage.getItem('username') ? localStorage.getItem('username') : 'Anonymous';
const profile = localStorage.getItem('profile') ? localStorage.getItem('profile') : pictures[Math.floor(Math.random() * pictures.length)];
const room = localStorage.getItem('room') ? localStorage.getItem('room') : 'general';

document.getElementById(room).classList.add('active');
newNameForm.username.value = localStorage.getItem('username') ? localStorage.getItem('username') : null;

//Set profile pictures
document.querySelector('.user-appearence .avatar').setAttribute('src', `img/avatars/${profile}.png`);
showLoader();

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(room, username, profile);

// Get chats and render
chatroom.getChats((data) => chatUI.render(data));
