var Endpoints = require('./Endpoints');
const fetch = require('node-fetch');

class AssetEndpoints extends Endpoints {
  constructor(key = "api-key-not-specified", secret = "api-secret-not-specified") {
    super();
    this.key = key;
    this.secret = secret;
    this.headers = {
      'Content-Type': 'application/json',
      'X-API-KEY': this.key,
      'X-API-SECRET': this.secret
    }
  }

  /**
   * Lists all assets that we support.
   * Reference: https://docs.blockfacts.io/?javascript#list-all-assets
   */
  listAllAssets() {
    return fetch('https://api.blockfacts.io/api/v1/assets', { headers: this.headers })
    .then(response => response.json())
  }
  
  /**
   * Gets specific asset by ticker ID.
   * @param {string} tickerId
   * Reference: https://docs.blockfacts.io/?javascript#specific-asset
   */
  getSpecificAsset(tickerId) {
    return fetch(`https://api.blockfacts.io/api/v1/assets/${tickerId}`, { headers: this.headers })
    .then(response => response.json())
  }
}

module.exports = AssetEndpoints;