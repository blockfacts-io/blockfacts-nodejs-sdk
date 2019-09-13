const WebSocket = require('ws');
class WebSocketClient {
  constructor(key = "api-key-not-specified", secret = "api-secret-not-specified") {
   this.key = key;
   this.secret = secret;
   this.websocketURL = 'wss://ws.blockfacts.io/v1/';
  }

  /**
   * Subscribe method used for subscribing to BlockFacts real-time crypto data fetching.
   * @param {any} message Message can be provided in stringified JSON format, or raw JSON itself.
   * @param {function} callback Callback function which receives the data and handles it.
   * Reference: https://docs.blockfacts.io/#subscribe
   */
  subscribe(message, callback) {
    if (typeof(message) == 'object') {
      message = JSON.stringify(message);
    }

    this.socket = new WebSocket(this.websocketURL);
    this.socket.on('open', () => {
      this.socket.send(message);
    })

    this.socket.on('message', callback);
  }

  /**
   * Unsubscribe method used to unsubscribe from certain channels or pairs
   * @param {any} message Message can be provided in stringified JSON format, or raw JSON itself.
   * Reference: https://docs.blockfacts.io/#unsubscribe
   */
  unsubscribe(message) {
    if (typeof(message) == 'object') {
      message = JSON.stringify(message);
    }

    this.socket.send(message);
  }

  /**
   * Sends a ping type message to the server to determine if the server is online.
   * Reference: https://docs.blockfacts.io/#ping
   */
  ping() {
    this.socket.send(JSON.stringify({
      "type":"ping"
    }));
  }

  /**
   * Sends a pong type message to the server to let the server know that the client is still connected.
   * Reference: https://docs.blockfacts.io/#pong
   */
  pong() {
    this.socket.send(JSON.stringify({
      "type":"pong"
    }));
  }
}

module.exports = WebSocketClient;