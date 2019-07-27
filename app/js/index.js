window.onload = function() {
  //initialize and start socket connection after window load
  var refreshInterval = 1000;
  var uiHelper = new UIHelper();
  var dataStore = new DataApi();
  var socket = new SocketApi({
    url: 'ws://stocks.mnet.website',
    onmessage: function(message) {
      dataStore.addValues(message);
    }
  });

  socket.startConnection();

  setInterval(() => {
    var stocks = dataStore.fetchStocks();
    stocks.forEach((info, stock) => {
      uiHelper.updateStockItem(stock, info);
    });
  }, refreshInterval);

  setTimeout(() => {
    socket.closeConnection();
  }, 360000);
}