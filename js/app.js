// Class instances
const chatroom = new Chatroom('general', 'Shawn', 'penguin');

// Get chats and render
chatroom.getChats((data) => {
  console.log(data);
});
