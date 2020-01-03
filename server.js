import express from 'express';
import open from 'open';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import serverDev from './server.dev';
// import serverIO from './server.io';
import { addReservation } from './db/reservations'
import { NEW_RESERVATION_SOCKET } from './protocols/reservations'
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const port = process.env.PORT || 9999;
const appURL = `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);

serverDev(app);

let userList = {};

const addClient = socket => userList[socket.id] = true;
const isConnected = socket => userList.hasOwnProperty(socket.id)
const removeClient = socket => delete userList[socket.id]

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (client) => {
	addClient(client)

	client.on('disconnect', () => {
		removeClient(client)
	});
});

reservationsService.start(reservation => {
	addReservation(reservation);
	io.emit(NEW_RESERVATION_SOCKET, reservation)
});

// socket.io server
// const server = serverIO(app, socket => {
// 	reservationsService.start(reservation => {});
// });

server.listen(port, () => {
	console.log(`Server started ${appURL}`);
	open(appURL);
});
