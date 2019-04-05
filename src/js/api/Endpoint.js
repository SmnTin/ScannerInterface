export default class Endpoint {
  constructor() {
    this.autoreconnect = false;
    this.listenersCounter = 0;
    this.listenersMap = {};
  }
  connect(url) {
    this.socket = new WebSocket(url);

    this.socket.onerror = (error) => {
      console.log("Ошибка сокета " + error.message);
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);

      if(this.autoreconnect)
        this.connect();
    };

    this.socket.onmessage = (event) => {
      this._onMessage(event.data);
    };
    
  }

  setAutoreconnect(val) {
    this.autoreconnect = val;
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  _onMessage(data) {
    let parsed = JSON.parse(data);
    for(let token in this.listenersMap)
      this.listenersMap[token](parsed);
  }

  addListener(listener) {
    let token = this.listenersCounter++;
    this.listenersMap[token] = listener;
    return token;
  }

  removeListener(token) {
    delete this.listenersMap[token];
  }
}