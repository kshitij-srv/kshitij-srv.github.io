(function(global, UIHelper) {
  global.UIHelper = UIHelper();
})(this, function() {
  function UIHelper() {}

  UIHelper.prototype.updateStockItem = function(stock, info) {
    var stockItem = document.getElementById(stock);
    if (!stockItem) {
      var stockTicker = null;
      var stockValue = null;
      var stockTime = null;

      var stockDataWrapper = document.getElementById('stock-data-wrapper');

      stockItem = document.createElement('tr');
      stockItem.id = stock;
      stockItem.classList.add('stock-item');

      stockTicker = document.createElement('td');
      stockTicker.id = 'ticker-' + stock;
      stockTicker.classList.add('stock-ticker')

      stockValue = document.createElement('td');
      stockValue.id = 'value-' + stock;
      stockValue.classList.add('stock-value');

      stockTime = document.createElement('td');
      stockTime.id = 'time-' + stock;
      stockTime.classList.add('stock-time');

      stockItem.appendChild(stockTicker);
      stockItem.appendChild(stockValue);
      stockItem.appendChild(stockTime);

      stockDataWrapper.appendChild(stockItem);
    } else {
      stockTicker = document.getElementById('ticker-' + stock);
      stockValue = document.getElementById('value-' + stock);
      stockTime = document.getElementById('time-' + stock);
    }

    stockTicker.textContent = stock;
    stockValue.textContent = info.value;
    stockTime.textContent = info.time;

    if (info.delta > 0) {
      stockValue.classList.remove('decreasing');
      stockValue.classList.add('increasing');
    }
    if (info.delta <  0) {
      stockValue.classList.remove('increasing');
      stockValue.classList.add('decreasing');
    }
  };

  return UIHelper;
});