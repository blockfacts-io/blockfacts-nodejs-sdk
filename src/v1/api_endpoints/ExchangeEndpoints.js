var Endpoints = require('./Endpoints');
const fetch = require('node-fetch');

class ExchangeEndpoints extends Endpoints {
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
   * Lists all exchanges that we support.
   * Reference: https://docs.blockfacts.io/?javascript#all-exchanges
   */
  listAllExchanges() {
    return fetch('https://api.blockfacts.io/api/v1/exchanges', { headers: this.headers })
    .then(response => response.json())
  }
  
  /**
   * Gets information about a specific exchange by its name. Returns information such as which assets are supported, asset ticker info, etc.
   * @param {string} exchange 
   * Reference: https://docs.blockfacts.io/?javascript#specific-exchange-data
   */
  getSpecificExchangeData(exchange) {
    return fetch(`https://api.blockfacts.io/api/v1/exchanges/${exchange}`, { headers: this.headers })
    .then(response => response.json())
  }
  
  /**
   * Gets current trade data for specific asset-denominator pair, from specific exchange(s).
   * @param {any} assets Asset array or comma-separated string.
   * @param {any} denominators Denominator array or comma-separated string.
   * @param {any} exchanges Exchange array or comma-separated string.
   * Reference: https://docs.blockfacts.io/?javascript#current-trade-data
   */
  getCurrentTradeData(assets, denominators, exchanges) {
    var assetsString = "";
    var denominatorsString = "";
    var exchangesString = "";

    if(Array.isArray(assets))
    assetsString = assets.join(',');
    else assetsString = assets;

    if(Array.isArray(denominators))
    denominatorsString = denominators.join(',');
    else denominatorsString = denominators;

    if(Array.isArray(exchanges))
    exchangesString = exchanges.join(',');
    else exchangesString = exchanges;

    assetsString = assetsString.replace(/ /g,'');
    denominatorsString = denominatorsString.replace(/ /g,'');
    exchangesString = exchangesString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades?asset=${assetsString}&denominator=${denominatorsString}&exchange=${exchangesString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets exchange historical price by asset-denominator, exchange, date, time and interval.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {any} exchanges 
   * @param {string} date 
   * @param {string} time 
   * @param {number} interval 
   * @param {number} page 
   * Reference: https://docs.blockfacts.io/#historical-trade-data
   */
  getHistoricalTradeData(asset, denominator, exchanges, date, time, interval, page) {
    var exchangesString = "";

    if(Array.isArray(exchanges))
    exchangesString = exchanges.join(',');
    else exchangesString = exchanges;

    exchangesString = exchangesString.replace(/ /g,'');

    if (page == undefined || page == null) {
      page = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/historical?asset=${asset}&denominator=${denominator}&exchange=${exchangesString}&date=${date}&time=${time}&interval=${interval}&page=${page}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets historical exchange trades in specific second.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {any} exchanges 
   * @param {string} date 
   * @param {string} time 
   * Reference: https://docs.blockfacts.io/#specific-trade-data
   */
  getSpecificTradeData(asset, denominator, exchanges, date, time) {
    var exchangesString = "";

    if(Array.isArray(exchanges))
    exchangesString = exchanges.join(',');
    else exchangesString = exchanges;

    exchangesString = exchangesString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/specific?asset=${asset}&denominator=${denominator}&exchange=${exchangesString}&date=${date}&time=${time}`, { headers: this.headers })
    .then(response => response.json())
  }
  
  /**
   * Gets exchange end of day data for specific asset-denominator and exchange.
   * @param {string} asset 
   * @param {string} denominator 
   * @param {string} exchange 
   * @param {number} length 
   * Reference: https://docs.blockfacts.io/#end-of-day-data-2
   */
  getEndOfDayData(asset, denominator, exchange, length) {
    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/endOfDay?asset=${asset}&denominator=${denominator}&exchange=${exchange}&length=${length}`, { headers: this.headers })
    .then(response => response.json())
  }
}

module.exports = ExchangeEndpoints;