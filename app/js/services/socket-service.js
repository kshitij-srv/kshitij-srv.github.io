(function(global, SocketApi) {
  global.SocketApi = SocketApi();
})(this, function() {
  var socketConfig = {};
  var socket = null;

  function SocketApi(config) {
    if (!config.url) {
      throw 'Server URL not provided!!';
    }

    socketConfig = config;
  }

  function initializeSocket() {
    socket = new WebSocket(socketConfig.url);

    socket.onerror = function(error) {
      if (typeof(socketConfig.onerror) === 'function') {
        socketConfig.onerror(error);
      } else {
        throw 'WebSocket error: ' + error;
      }
    }
  
    socket.onopen = function(event) {
      if (typeof(socketConfig.onopen) === 'function') {
        socketConfig.onopen(event);
      } else {
        console.log('Connected to: ' + event.currentTarget.url);
      }
    }

    socket.onclose = function(event) {
      if (typeof(socketConfig.onclose) === 'function') {
        socketConfig.onclose(event);
      } else {
        console.log('Closing connection to: ' + event.currentTarget.url);
      }
    }
  
    socket.onmessage = function(event) {
      if (typeof(socketConfig.onmessage) === 'function') {
        socketConfig,onmessage(event);
      } else {
        console.log('Message: ' + event.data);
      }
    }
  }

  SocketApi.prototype.startConnection = function() {
    if (!socket || socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED) {
      initializeSocket();
    }
  };

  SocketApi.prototype.closeConnection = function() {
    if (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN) {
      socket.close();
    } else {
      throw "Connection is already closing/closed";
    }
  }

  return SocketApi;
});