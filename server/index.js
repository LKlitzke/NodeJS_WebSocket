/* Conexões */
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();

// Inicializa servidor
const server = http.createServer(app);

// Inicializa instância do WebSocket
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  // Tratamento das mensagens recebidas
  ws.on("message", (message) => {
    let items = message.trim().replace(/\n|\r/g, "").split(' ');
    console.log(items);
    let retorno = 0;
    if(items.length != 3){
      retorno = "Operação inválida.";
    }
    else{
      switch(items[1]){
        case '+':
          retorno = Number(items[0]) + Number(items[2]);
          break;
        case '+':
          retorno = Number(items[0]) - Number(items[2]);
          break;
        case '*':
          retorno = Number(items[0]) * Number(items[2]);
          break;
        case '/':
          retorno = items[2] == 0 ? "Impossível dividir com denominador zero.": Number(items[0]) / Number(items[2]);
          break;
      }
    }
    ws.send(retorno);
  });
});

// Inicia o servidor
server.listen(process.env.PORT || 3000, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});

/*
  a) 1 + 1
  b) -123 + 123123
  c) 8 * 0
  d) 1239123 * 12313
  e) 123 / -12
  f) 313123 / 0
*/
