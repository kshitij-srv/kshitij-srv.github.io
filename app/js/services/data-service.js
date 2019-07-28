(function(global, DataApi) {
  global.DataApi = DataApi();
})(this, function() {
  var stockValues = null;

  function DataApi() {
    stockValues = new Map();
  }

  function addValue(stock) {
    var currentStock = stock[0];
    var currentStockValue = stock[1];

    if (!(currentStock && currentStockValue)) {
      throw 'Invalid stock data!';
    }

    var oldStockInfo = stockValues.get(currentStock);

    if (!oldStockInfo) {
      stockValues.set(currentStock, {
        value: currentStockValue,
        delta: 0,
        time: new Date()
      });
    } else {
      stockValues.set(currentStock, {
        value: currentStockValue,
        delta: currentStockValue - oldStockInfo.value,
        time: new Date()
      });
    }
  }

  function deserializeData(data) {
    return JSON.parse(data);
  }

  DataApi.prototype.addValues = function(stockArray) {
    stockArray = deserializeData(stockArray);

    if (!(stockArray instanceof Array)) {
      throw 'Invalid message data format!';
    }
    for (var i = 0; i < stockArray.length; i++) {
      addValue(stockArray[i]);
    }
  };

  DataApi.prototype.clearData = function() {
    if (stockValues && stockValues.size) {
      stockValues.clear();
    }
  };

  DataApi.prototype.fetchStocks = function() {
    return stockValues;
  };

  return DataApi;
});