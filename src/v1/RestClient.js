const AssetEndpoints = require("./api_endpoints/AssetEndpoints");
const BlockfactsEndpoints = require("./api_endpoints/BlockfactsEndpoints");
const ExchangeEndpoints = require("./api_endpoints/ExchangeEndpoints");

class RestClient {
  constructor(key = "api-key-not-specified", secret = "api-secret-not-specified") {
    this.assets = new AssetEndpoints(key, secret);
    this.blockfacts = new BlockfactsEndpoints(key, secret);
    this.exchanges = new ExchangeEndpoints(key, secret);
  }

  /**
   * Sets an API Key.
   * @param {string} apiKey 
   */
  setKey(apiKey) {
    this.assets.key = apiKey;
    this.blockfacts.key = apiKey;
    this.exchanges.key = apiKey;
  }

  /**
   * Sets an API Secret.
   * @param {string} apiSecret 
   */
  setSecret(apiSecret) {
    this.assets.secret = apiSecret;
    this.blockfacts.secret = apiSecret;
    this.exchanges.secret = apiSecret;
  }

  /**
   * Sets the headers for every request to BlockFacts API.
   * Not recommended to change, best to provide Api key and secret, the headers are automatically set.
   * @param {JSON} headers
   */
  setHeaders(headers) {
    this.assets.headers = headers;
    this.blockfacts.headers = headers;
    this.exchanges.headers = headers;
  }
}

module.exports = RestClient;