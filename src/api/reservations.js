import openSocket from 'socket.io-client';
import { NEW_RESERVATION_SOCKET } from '../../protocols/reservations'
const socket = openSocket('http://localhost:9999');

export const subscribeToReservations = callback => {
    try {
        socket.on(NEW_RESERVATION_SOCKET, reservation => {
            if (callback instanceof Function) {
                callback(reservation);
            }
        });
    } catch (err) {
        console.log(err)
    }
}

export const unsubscribeToReservations = callback => {
    try {
        socket.off(NEW_RESERVATION_SOCKET);
        if (callback instanceof Function)
            callback();
    } catch (err) {
        console.log(err)
    }
}