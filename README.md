![alt text](https://blockfacts.io/img/logo/bf-logo@2x.png "BlockFacts official logo")
# BlockFacts NodeJS SDK
Official BlockFacts Node.js SDK including Rest and WebSocket API support.

[![npm version](https://badge.fury.io/js/blockfacts-sdk.svg)](https://badge.fury.io/js/blockfacts-sdk)

## Features

- REST API client with function wrapper for easy API access
- WebSocket API client for real-time data gathering

**Note**: In order to read more and get richer details regarding our REST and WebSocket APIs, please refer to https://docs.blockfacts.io.

* [Installation](#installation)
* [Quick start](#quick-start)
* [Using Rest API Client](#using-rest-api-client)
* [Asset endpoints](#asset-endpoints)
* [BlockFacts endpoints](#blockfacts-endpoints)
* [Exchange endpoints](#exchange-endpoints)
* [Using WebSocket API Client](#using-websocket-api-client)

## Installation
```bash
$ npm install blockfacts-sdk
```

## Quick start
To start using our SDK just require the package and pass the `API-KEY` and `API-SECRET` in the constructor.

```js
const Blockfacts = require('blockfacts-sdk');
const key = 'your-api-key';
const secret = 'your-api-secret'

var restClient = new Blockfacts.RestClient(key, secret);
var websocketClient = new Blockfacts.WebSocketClient(key, secret);
```

## Using Rest API Client
In the examples below, you can see which method is mapped to call it's predefined endpoint. You can also read more about authorization and how to obtain an API Key here: https://docs.blockfacts.io/#authorization

**Note**: All of the functions are Promise based.

## Asset endpoints

### List all assets
Get all assets that we support.
- [`listAllAssets()`](https://docs.blockfacts.io/#list-all-assets)

```js
restClient.assets.listAllAssets().then(response => console.log(response))
```

### Get specific asset
Get specific asset by ticker ID.
- [`getSpecificAsset(tickerId)`](https://docs.blockfacts.io/#specific-asset)

```js
restClient.assets.getSpecificAsset("BTC").then(response => console.log(response))
```

## BlockFacts endpoints

### Exchanges in normalization
List exchanges that go into the normalization for specific asset-denominator pair.
- [`getExchangesInNormalization(pair)`](https://docs.blockfacts.io/#exchanges-in-normalization)

```js
restClient.blockfacts.getExchangesInNormalization(["BTC-USD", "ETH-USD"]).then(response => console.log(response))

// OR

restClient.blockfacts.getExchangesInNormalization("BTC-USD, ETH-USD").then(response => console.log(response))
```

### Current data
Get current normalization data for specific asset-denominator pair.
- [`getCurrentData(assets, denominators)`](https://docs.blockfacts.io/#current-data)

```js
restClient.blockfacts.getCurrentData(["BTC", "ETH"], ["USD", "EUR"]).then(response => console.log(response))

// OR

restClient.blockfacts.getCurrentData("BTC, ETH", "USD, EUR").then(response => console.log(response))
```

### Historical data
Get historical normalization data by asset-denominator, date, time and interval.
- [`getHistoricalData(asset, denominator, date, time, interval, page)`](https://docs.blockfacts.io/#historical-data)

```js
restClient.blockfacts.getHistoricalData("BTC", "USD", "2.9.2019", "14:00:00", 20).then(response => console.log(response))

// OR with page parameter (optional)

restClient.blockfacts.getHistoricalData("BTC", "USD", "2.9.2019", "14:00:00", 20, 3).then(response => console.log(response))
```

### Specific historical data
Get historical normalized price by specific point in time.
- [`getSpecificHistoricalData(asset, denominator, date, time)`](https://docs.blockfacts.io/#specific-historical-data)

```js
restClient.blockfacts.getSpecificHistoricalData("BTC", "USD", "2.9.2019", "14:00:00").then(response => console.log(response))
```

### Normalization pairs
Get all running normalization pairs. Resulting in which asset-denominator pairs are currently being normalized inside our internal system.
- [`getNormalizationPairs()`](https://docs.blockfacts.io/#normalization-pairs)

```js
restClient.blockfacts.getNormalizationPairs().then(response => console.log(response))
```

### End of day data
Get normalized end of day data for specific asset-denominator.
- [`getEndOfDayData(asset, denominator, length)`](https://docs.blockfacts.io/#end-of-day-data)

```js
restClient.blockfacts.getEndOfDayData("BTC", "USD", 1).then(response => console.log(response))
```

## Exchange endpoints

### List all exchanges
List all exchanges that we support.
- [`listAllExchanges()`](https://docs.blockfacts.io/#all-exchanges)

```js
restClient.exchanges.listAllExchanges().then(response => console.log(response))
```

### Specific exchange data
Get information about a specific exchange by its name. Returns information such as which assets are supported, asset ticker info, etc.
- [`getSpecificExchangeData(exchange)`](https://docs.blockfacts.io/#specific-exchange-data)

```js
restClient.exchanges.getSpecificExchangeData("kraken").then(response => console.log(response))
```

### Current trade data
Get current trade data for specific asset-denominator pair, from specific exchange(s).
- [`getCurrentTradeData(assets, denominators, exchanges)`](https://docs.blockfacts.io/#current-trade-data)

```js
restClient.exchanges.getCurrentTradeData(["BTC", "ETH"], ["USD", "GBP"], ["kraken", "coinbase"]).then(response => console.log(response))

// OR

restClient.exchanges.getCurrentTradeData("BTC, ETH", "USD, GBP", "kraken, coinbase").then(response => console.log(response))
```

### Historical trade data
Get exchange historical price by asset-denominator, exchange, date, time and interval.
- [`getHistoricalTradeData(asset, denominator, exchanges, date, time, interval, page)`](https://docs.blockfacts.io/#historical-trade-data)

```js
restClient.exchanges.getHistoricalTradeData("BTC", "USD", ["kraken", "coinbase"], "2.9.2019", "14:00:00", 20).then(response => console.log(response))

// OR with page parameter (optional)

restClient.exchanges.getHistoricalTradeData("BTC", "USD", "kraken, coinbase", "2.9.2019", "14:00:00", 20, 3).then(response => console.log(response))
```

### Specific trade data
Get historical exchange trades in specific second.
- [`getSpecificTradeData(asset, denominator, exchanges, date, time)`](https://docs.blockfacts.io/#specific-trade-data)

```js
restClient.exchanges.getSpecificTradeData("BTC", "USD", ["kraken", "coinbase"], "2.9.2019", "14:00:00").then(response => console.log(response))

// OR

restClient.exchanges.getSpecificTradeData("BTC", "USD", "kraken, coinbase", "2.9.2019", "14:00:00").then(response => console.log(response))
```

### End of day data
Get exchange end of day data for specific asset-denominator and exchange
- [`getEndOfDayData(asset, denominator, exchange, length)`](https://docs.blockfacts.io/#end-of-day-data-2)

```js
restClient.exchanges.getEndOfDayData("BTC", "USD", "KRAKEN", 5).then(response => console.log(response))
```


## Using WebSocket API Client
Our WebSocket feed provides real-time market data streams from multiple exchanges at once and the BlockFacts normalized price stream for each second. The WebSocket feed uses a bidirectional protocol, and all messages sent and received via websockets are encoded in a `JSON` format.

**Note**: Please refer to https://docs.blockfacts.io/#websocket-api in order to find out what types of subscriptions and requests you can send to our WebSocket server.

### Subscribing
In order to subscribe to a specific channel or asset-pair you must send out a `subscribe` type message. Our SDK allows you to do just that with the following code example: 

```js
var subscribeMsg = JSON.stringify({
  "type":"subscribe",
  "X-API-KEY":`${key}`,
  "X-API-SECRET":`${secret}`,
  "channels": [
    {
      "name":"BLOCKFACTS",
      "pairs": [
        "BTC-USD"
      ]
    }
  ]
});

websocketClient.subscribe(subscribeMsg, (data) => {
  data = JSON.parse(data);
  console.log(data);

  if(data.type == 'ping') {
    websocketClient.pong();
  }

  if (data.type == 'error') {
    // Handle error
  }

  if (data.type == 'heartbeat') {
    // Handle heartbeat
  }

  if(data.type == 'unsubscribed') {
    // Handle unsubscribe
  }

  if (data.type == 'exchangeTrade') {
    // Handle exchangeTrade
  }

  if (data.type == 'blockfactsPrice') {
    // Handle blockfactsPrice
  }

});
```

### Unsubscribing
If you wish to unsubscribe from certain channels or pairs, you can do so by sending the `unsubscribe` type message.

```js
var unsubscribeMsg = JSON.stringify({
  "type":"unsubscribe",
  "channels": [
    {
      "name":"BLOCKFACTS",
      "pairs": [
        "BTC-USD"
      ]
    }
  ]
});

websocketClient.unsubscribe(unsubscribeMsg);
```
### Ping
Clients can send `ping` type messages to determine if the server is online.

```js
websocketClient.ping();
```

### Pong
Clients must respond to `ping` type messages sent from the server with a `pong` type message.

```js
websocketClient.pong();
```

In order to have a better understanding of our server responses, please refer to: https://docs.blockfacts.io/#server-messages
