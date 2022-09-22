window.onload = function () {
  var socket = new WebSocket("ws://localhost:3000/");
  connect();

  var closeBtn = document.getElementById("close");
  var clearBtn = document.getElementById("clear");
  var form = document.getElementById("message-form");
  var messageField = document.getElementById("message");
  var messagesList = document.getElementById("messages");
  var socketStatus = document.getElementById("status");


function connect() {
  socket = new WebSocket("ws://localhost:3000/");
  // Conectar WebSocket
  socket.onopen = function (event) {
    socketStatus.innerHTML =
      "Conectado ao servidor: " + event.currentTarget.url;
    socketStatus.className = "open";
  };

  // Receber mensagem
  socket.onmessage = function (event) {
    var message = event.data;
    messagesList.innerHTML +=
      '<li class="received"><span>Recebido:</span>' + message + "</li>";
  };

  socket.onerror = function (error) {
    console.log("WebSocket Error: ", error);
  };

  // Desconectar WebSocket
  socket.onclose = function (event) {
    socketStatus.innerHTML = "Websocket desconectado.";
    socketStatus.className = "closed";
  };
}
  


  form.onsubmit = function (e) {
    e.preventDefault();
    var message = messageField.value;
    if(socket.readyState != 1){
      messagesList.innerHTML += '<li class="not-received"><span>Recebido:</span>WebSocket desconectado, tente novamente.</li>';
    }
    else {
      socket.send(message);
      messagesList.innerHTML += '<li class="sent"><span>Enviado:</span>' + message + "</li>";
      messageField.value = "";
    }
    return false;
  };

  // Encerrar conexão
  closeBtn.onclick = function (e) {
    e.preventDefault();
    alert(socket.readyState);
    if(socket.readyState == 1) { 
      socket.close();
      closeBtn.innerHTML = "Reconectar";
    }
    else {
      connect();
      closeBtn.innerHTML = "Finalizar conexão";
      socketStatus.innerHTML =
      "Conectado ao servidor: " + socket.url;
      socketStatus.className = "open";
      
    }
    return false;
  };

  // Limpar mensagens
  clearBtn.onclick = function (e) {
    messagesList.innerHTML ='';
  };
};
