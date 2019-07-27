window.onload = function() {
  //initialize and start socket connection after window load
  var refreshInterval = 1000;
  var uiHelper = new UIHelper();
  var dataStore = new DataApi();
  var socket = new SocketApi({
    url: 'ws://stocks.mnet.website',
    onmessage: function(message) {
      dataStore.addValues(message);
    },
    onopen: function(event) {
      document.getElementById('connect-status').textContent = 'Connected to: ' + event.currentTarget.url;
    },
    onclose: function(event) {
      document.getElementById('connect-status').textContent = 'Connection closed';
    },
    onerror: function(error) {
      throw 'WebSocket error: ' + error;
    }
  });

  document.getElementById('connect-button').addEventListener('click', () => {
    socket.startConnection();
  });

  document.getElementById('disconnect-button').addEventListener('click', () => {
    socket.closeConnection();
  });

  setInterval(() => {
    var stocks = dataStore.fetchStocks();
    stocks.forEach((info, stock) => {
      uiHelper.updateStockItem(stock, info);
    });
  }, refreshInterval);
}