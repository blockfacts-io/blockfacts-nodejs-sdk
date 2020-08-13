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
   * @param {any} denominators Denominator array or comma-separated string.
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
   * Gets last 600 BLOCKFACTS normalized prices for provided asset-denominator pairs.
   * @param {any} asset Asset array or comma-separated string.
   * @param {any} denominators Denominator array or comma-separated string.
   * Reference: https://docs.blockfacts.io/#data-snapshot
   */
  getSnapshotData(assets, denominators) {
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

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price/snapshot?asset=${assetsString}&denominator=${denominatorsString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets the snapshot of Blockfacts OHLCV data for provided asset-denominator pairs and intervals.
   * @param {any} asset Asset array or comma-separated string.
   * @param {any} denominators Denominator array or comma-separated string.
   * @param {any} intervals Interval array or comma-separated string.
   * Reference: https://docs.blockfacts.io/#data-snapshot-ohlcv-blockfacts
   */
  getOHLCVSnapshotData(assets, denominators, intervals) {
    var assetsString = "";
    var denominatorsString = "";
    var intervalsString = "";

    if(Array.isArray(assets))
    assetsString = assets.join(',');
    else assetsString = assets;

    if(Array.isArray(denominators))
    denominatorsString = denominators.join(',');
    else denominatorsString = denominators;

    if(Array.isArray(intervals))
    intervalsString = intervals.join(',');
    else intervalsString = intervals;

    assetsString = assetsString.replace(/ /g,'');
    denominatorsString = denominatorsString.replace(/ /g,'');
    intervalsString = intervalsString.replace(/ /g,'');

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/price/ohlcv-snapshot?asset=${assetsString}&denominator=${denominatorsString}&interval=${intervalsString}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Gets historical normalization data by asset-denominator, date, time and interval.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {string} time UTC time in format HH:MM:SS
   * @param {number} interval Interval range
   * @param {number} page Results page
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
   * Gets historical OHLCV data by asset-denominator, interval, date and time.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {string} interval OHLCV Interval (30s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 1w, 1mo)
   * @param {string} dateStart Start date in format: DD.MM.YYYY
   * @param {string} timeStart Start UTC time in format HH:MM:SS
   * @param {string} dateEnd End date in format: DD.MM.YYYY
   * @param {string} timeEnd End UTC time in format HH:MM:SS
   * @param {number} page Results page
   * Reference: https://docs.blockfacts.io/?javascript#ohlcv-historical-data
   */
  getHistoricalOHLCVData(asset, denominator, interval, dateStart, timeStart, dateEnd, timeEnd, page) {
    if (page == undefined || page == null) {
      page = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/ohlcv?asset=${asset}&denominator=${denominator}&interval=${interval}&dateStart=${dateStart}&timeStart=${timeStart}&dateEnd=${dateEnd}&timeEnd=${timeEnd}&page=${page}`, { headers: this.headers })
    .then(response => response.json())
  }

  /**
   * Get historical normalized price by specific point in time.
   * @param {string} asset Base currency
   * @param {string} denominator Quote currency
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {string} time UTC time in format HH:MM:SS
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
   * Gets the moving percentage, and difference in price over a certain time period.
   * @param {string} denominator Quote currency
   * @param {string} date Date in format: DD.MM.YYYY
   * @param {number} interval Interval (oneDay, sevenDay, thirtyDay, ninetyDay, oneYear, twoYear, threeYear, fiveYear)
   * @param {number} sort Sort options (1 - Losers first, -1 - Winners first)
   * Reference: https://docs.blockfacts.io/?javascript#period-movers
   */
  getPeriodMovers(denominator, date, interval, sort) {
    if (sort == undefined || sort == null) {
      sort = 1;
    }

    return fetch(`https://api.blockfacts.io/api/v1/blockfacts/period-movers?denominator=${denominator}&date=${date}&interval=${interval}&sort=${sort}`, { headers: this.headers })
    .then(response => response.json())
  }
  
}

module.exports = BlockfactsEndpoints;