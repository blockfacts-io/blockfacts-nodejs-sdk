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
   * Gets the Blockfacts pair representation of the provided exchange pair
   * @param {string} exchange 
   * Reference: https://docs.blockfacts.io/?javascript#pair-info
   */
  getPairInfo(exchange, pair) {
    return fetch(`https://api.blockfacts.io/api/v1/exchanges/pair-info?exchange=${exchange}&pair=${pair}`, { headers: this.headers })
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
   * Gets 600 latest trades that happened on the requested exchanges and pairs.
   * @param {any} assets Asset array or comma-separated string.
   * @param {any} denominators Denominator array or comma-separated string.
   * @param {any} exchanges Exchange array or comma-separated string.
   * Reference: https://docs.blockfacts.io/#snapshot-trade-data
   */
  getSnapshotTradeData(assets, denominators, exchanges) {
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

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/snapshot?asset=${assetsString}&denominator=${denominatorsString}&exchange=${exchangesString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets the snapshot of provided exchange(s) OHLCV data for provided asset-denominator pairs and intervals.
   * @param {any} assets Asset array or comma-separated string.
   * @param {any} denominators Denominator array or comma-separated string.
   * @param {any} exchanges Exchange array or comma-separated string.
   * @param {any} intervals Interval array or comma-separated string.
   * Reference: https://docs.blockfacts.io/#data-snapshot-ohlcv-exchange
   */
  getOHLCVSnapshotData(assets, denominators, exchanges, intervals) {
    var assetsString = "";
    var denominatorsString = "";
    var exchangesString = "";
    var intervalsString = "";

    if(Array.isArray(assets))
    assetsString = assets.join(',');
    else assetsString = assets;

    if(Array.isArray(denominators))
    denominatorsString = denominators.join(',');
    else denominatorsString = denominators;

    if(Array.isArray(exchanges))
    exchangesString = exchanges.join(',');
    else exchangesString = exchanges;

    if(Array.isArray(intervals))
    intervalsString = intervals.join(',');
    else intervalsString = intervals;

    assetsString = assetsString.replace(/ /g,'');
    denominatorsString = denominatorsString.replace(/ /g,'');
    exchangesString = exchangesString.replace(/ /g,'');
    intervalsString = intervalsString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/ohlcv-snapshot?asset=${assetsString}&denominator=${denominatorsString}&exchange=${exchangesString}&interval=${intervalsString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets exchange historical price by asset-denominator, exchange, date, time and interval.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {any} exchanges Exchange list
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {string} time UTC time in format HH:MM:SS
   * @param {number} interval Interval range
   * @param {number} page Results page
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
   * Gets exchange historical OHLCV data by asset-denominator, exchange, interval, date and time.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {any} exchanges Exchange list
   * @param {any} interval OHLCV Interval (30s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 1w, 1mo)
   * @param {string} dateStart Start date in format: DD.MM.YYYY
   * @param {string} timeStart Start UTC time in format HH:MM:SS
   * @param {string} dateEnd End date in format: DD.MM.YYYY
   * @param {string} timeEnd End UTC time in format HH:MM:SS
   * @param {number} page Results page
   * Reference: https://docs.blockfacts.io/#ohlcv-historical-data-2
   */
  getHistoricalOHLCVData(asset, denominator, exchanges, interval, dateStart, timeStart, dateEnd, timeEnd, page) {
    var exchangesString = "";

    if(Array.isArray(exchanges))
    exchangesString = exchanges.join(',');
    else exchangesString = exchanges;

    exchangesString = exchangesString.replace(/ /g,'');

    if (page == undefined || page == null) {
      page = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/ohlcv?asset=${asset}&denominator=${denominator}&exchange=${exchangesString}&interval=${interval}&dateStart=${dateStart}&timeStart=${timeStart}&dateEnd=${dateEnd}&timeEnd=${timeEnd}&page=${page}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets historical exchange trades in specific second.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {any} exchanges Exchange list
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {string} time UTC time in format HH:MM:SS
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
   * Gets the total traded volume on all exchanges by asset-denominator and interval.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {string} interval Interval (1d, 30d, 60d, 90d)
   * Reference: https://docs.blockfacts.io/?javascript#total-trade-volume
   */
  getTotalTradeVolume(asset, denominator, interval) {
    return fetch(`https://api.blockfacts.io/api/v1/exchanges/trades/total-volume?asset=${asset}&denominator=${denominator}&interval=${interval}`, { headers: this.headers })
    .then(response => response.json())
  }

    /**
   * Gets the moving percentage, and difference in price over a certain time period.
   * @param {string} exchange Exchange name
   * @param {string} denominator Quote currency
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {number} interval Interval (oneDay, sevenDay, thirtyDay, ninetyDay, oneYear, twoYear, threeYear, fiveYear)
   * @param {number} sort Sort options (1 - Losers first, -1 - Winners first)
   * Reference: https://docs.blockfacts.io/?javascript#period-movers-2
   */
  getPeriodMovers(exchange, denominator, date, interval, sort) {
    if (sort == undefined || sort == null) {
      sort = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/exchanges/period-movers?exchange=${exchange}&denominator=${denominator}&date=${date}&interval=${interval}&sort=${sort}`, { headers: this.headers })
    .then(response => response.json())
  }

}

module.exports = ExchangeEndpoints;