var Endpoints = require('./Endpoints');
const fetch = require('node-fetch');

class BlockfactsEndpoints extends Endpoints {
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
   * Lists all exchanges that go into the normalization for specific asset-denominator pair.
   * @param {any} pairs Pair array or comma-separated string
   * You can pass an array of asset-denominator string pairs, or pass just one string with comma separated pairs.
   * Reference: https://docs.blockfacts.io/?javascript#exchanges-in-normalization
   */
  getExchangesInNormalization(pairs) {
    var pairsString = "";
    if(Array.isArray(pairs))
      pairsString = pairs.join(',');
    else pairsString = pairs;

    pairsString = pairsString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/normalization/whitelist/${pairsString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets current normalization data for specific asset-denominator pair.
   * @param {any} asset Asset array or comma-separated string.
   * @param {any} denominator Denominator array or comma-separated string.
   * Reference: https://docs.blockfacts.io/?javascript#current-data
   */
  getCurrentData(assets, denominators) {
    var assetsString = "";
    var denominatorsString = "";

    if(Array.isArray(assets))
    assetsString = assets.join(',');
    else assetsString = assets;

    if(Array.isArray(denominators))
    denominatorsString = denominators.join(',');
    else denominatorsString = denominators;

    assetsString = assetsString.replace(/ /g,'');
    denominatorsString = denominatorsString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price?asset=${assetsString}&denominator=${denominatorsString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets historical normalization data by asset-denominator, date, time and interval.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {string} date 
   * @param {string} time 
   * @param {number} interval 
   * @param {number} page 
   * Reference: https://docs.blockfacts.io/?javascript#historical-data
   */
  getHistoricalData(asset, denominator, date, time, interval, page) {
    if (page == undefined || page == null) {
      page = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price/historical?asset=${asset}&denominator=${denominator}&date=${date}&time=${time}&interval=${interval}&page=${page}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Get historical normalized price by specific point in time.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {string} date 
   * @param {string} time 
   * Reference: https://docs.blockfacts.io/?javascript#specific-historical-data
   */
  getSpecificHistoricalData(asset, denominator, date, time) {
    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price/specific?asset=${asset}&denominator=${denominator}&date=${date}&time=${time}`, { headers: this.headers })
    .then(response => response.json())
  }
  
  /**
   * Gets all running normalization pairs. Resulting in which asset-denominator pairs are currently being normalized inside our internal system.
   * Reference: https://docs.blockfacts.io/?javascript#normalization-pairs
   */
  getNormalizationPairs() {
    return fetch('https://api.blockfacts.io/api/v1/blockfacts/normalization/trades', { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Get normalized end of day data for specific asset-denominator.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {number} length 
   * Reference: https://docs.blockfacts.io/?javascript#end-of-day-data
   */
  getEndOfDayData(asset, denominator, length) {
    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price/endOfDay?asset=${asset}&denominator=${denominator}&length=${length}`, { headers: this.headers })
    .then(response => response.json())
  }
  
}

module.exports = BlockfactsEndpoints;