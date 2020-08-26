class Chatroom {
  constructor(room, username, profile) {
    this.room = room;
    this.username = username;
    this.profile = profile;
    this.chats = db.collection('chats');
    this.unsub;
  }

  // Add new chat to collection
  async addChat(message) {
    //format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      profile: this.profile,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // Sate the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  // Get new chat in real time
  getChats(callback) {
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            callback(change.doc.data());
          }
        });
      });
  }

  // Update username
  updateName(username) {
    this.username = username;
  }

  // Update profile
  updateName(profile) {
    this.profile = profile;
  }

  // Update room
  updateRoom(room) {
    this.room = room;
    console.log('Room updated');
    if (this.unsub) {
      this.unsub();
    }
  }
}
