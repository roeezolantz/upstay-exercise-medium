import express from 'express';
import open from 'open';
import http from 'http';
import socketIO from 'socket.io';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import serverDev from './server.dev';
import { addReservation, getHotelById } from './db'
import { NEW_RESERVATION_SOCKET } from './protocols/reservations'
import { SERVER_ADDRESS } from './src/utils/conf'

const app = express();
const port = process.env.PORT || 9999;
const appURL = SERVER_ADDRESS;

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
	console.log("WHOHA someone connected!!")
	addClient(client)

	client.on('disconnect', () => {
		console.log("Oops.. someone diconnected..")
		removeClient(client)
	});
});

reservationsService.start(async reservation => {
	const hotel_name = await getHotelById(reservation.hotel_id)
	const enrichedRes = {
		...reservation,
		hotel_name
	}

	if (addReservation(reservation)) {
		io.emit(NEW_RESERVATION_SOCKET, enrichedRes)
	}
});

server.listen(port, () => {
	console.log(`Server started ${appURL}`);
	open(appURL);
});
