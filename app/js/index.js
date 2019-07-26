window.onload = function() {
  //initialize and start socket connection after window load
  var socket = new SocketApi({
    url: 'ws://stocks.mnet.website'
  });

  socket.startConnection();

  //close the connection after 10 sec
  setTimeout(() => {
    socket.closeConnection();
  }, 10000);
}