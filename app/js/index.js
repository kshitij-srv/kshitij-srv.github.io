window.onload = function() {
  //initialize and start socket connection after window load
  var dataStore = new DataApi();

  var socket = new SocketApi({
    url: 'ws://stocks.mnet.website',
    onmessage: function(message) {
      dataStore.addValues(message);
    }
  });

  socket.startConnection();

  //close the connection after 10 sec
  setInterval(() => {
    var stocks = dataStore.fetchStocks();
    var stockDataWrapper = document.getElementById('stock-data-wrapper');
    stocks.forEach((info, stock) => {
      var stockItem = document.getElementById(stock);
      if (!stockItem) {
        var stockNameSpan = null;
        var stockValueSpan = null;
        var stockTimeSpan = null;

        stockItem = document.createElement('tr');
        stockItem.id = stock;
        stockItem.style.padding = '10px';
        stockItem.style.boxSizing = 'border-box';

        stockNameData = document.createElement('td');
        stockNameData.id = 'name-' + stock;
        stockNameData.style.padding = '10px';
        stockNameData.style.boxSizing = 'border-box';

        stockValueData = document.createElement('td');
        stockValueData.id = 'value-' + stock;
        stockValueData.style.padding = '10px';
        stockValueData.style.boxSizing = 'border-box';

        stockTimeData = document.createElement('td');
        stockTimeData.id = 'time-' + stock;
        stockTimeData.style.padding = '10px';
        stockTimeData.style.boxSizing = 'border-box';

        stockItem.appendChild(stockNameData);
        stockItem.appendChild(stockValueData);
        stockItem.appendChild(stockTimeData);

        stockDataWrapper.appendChild(stockItem);
      } else {
        stockNameData = document.getElementById('name-' + stock);
        stockValueData = document.getElementById('value-' + stock);
        stockTimeData = document.getElementById('time-' + stock);
      }

      stockNameData.textContent = stock;
      stockValueData.textContent = info.value;
      stockTimeData.textContent = info.time;
      if (info.delta > 0) {
        stockValueData.style.background = 'green';
        stockValueData.style.color = 'white';
      }
      if (info.delta <  0) {
        stockValueData.style.background = 'red';
        stockValueData.style.color = 'white';
      }
    });
  }, 1000);

  setTimeout(() => {
    socket.closeConnection();
  }, 360000);
}