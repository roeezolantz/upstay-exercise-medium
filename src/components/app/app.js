import React, { useEffect, useState } from 'react';
import SVGUpsay from './svg-upstay';
import { Welcome } from './app.style';
import ReservationsList from '../ReservationsList';
import { subscribeToReservations, unsubscribeToReservations } from '../../api/reservations'
import { Grid } from '@material-ui/core';

const App = () => {
	const [reservations, setReservetions] = useState([])

	const addReservation = (newReservation) => {
		setReservetions(reservations => [...reservations, newReservation]);
	};

	useEffect(() => {
		console.log("subscribing..")
		subscribeToReservations(addReservation)
		console.log("subscribed...")

		return () => {
			unsubscribeToReservations();
			console.log("unsubscribed...")
		};
	}, []);

	return (
		<Grid>
			<Grid container
				justify="center"
				alignItems="center">
				<Welcome>Welcome to</Welcome>
				<SVGUpsay />
			</Grid>
			<Grid item xs={12}>
				<ReservationsList listData={reservations} />
			</Grid>
		</Grid >

	);
};

export default App;
