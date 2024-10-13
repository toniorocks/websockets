// server.js
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const url = require('url');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, req) => {

    const parameters = url.parse(req.url, true).query;
    const paramValue = parameters.nombre;

    //console.log('paramValue --------> ', parameters);

    // Asignar un identificador único al cliente
    const clientId = paramValue;
    socket.clientId = clientId;
    console.log(`Cliente conectado: ${clientId}`);
    socket.on('message', message => {
        // Retransmitir el mensaje a todos los clientes conectados
        server.clients.forEach(client => {
            console.log('client.readyState', client);
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Cliente ${clientId}: ${message}`);
            }
        });
    });

    socket.on('close', () => {
        console.info('Cliente desconectado');
    });
});

console.info('Servidor WebSocket escuchando en ws://localhost:8080');