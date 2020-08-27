class ChatUI {
  constructor(list) {
    this.list = list;
  }

  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
    <div class="chat">
      <span class="img-container">
        <img src="img/avatars/${data.profile}.png" alt="User avatar" class="avatar" />
      </span>
      <div class="chat-header">
        <p>${data.username}</p>
        <span>${when}</span>
      </div>
      <div class="chat-message">${data.message}</div>
    </div>
    `;

    this.list.innerHTML += html;
    window.scrollTo(0, document.body.scrollHeight);
  }

  clear() {
    this.list.innerHTML = '';
  }
}
