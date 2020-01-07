import React, { useEffect, useState } from 'react';
import Media from 'react-media';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import SVGUpsay from './svg-upstay';
import { Welcome } from './app.style';
import ReservationsList from '../ReservationsList';
import { subscribeToReservations, unsubscribeToReservations, getAllCurrencies, getConvertedRate } from '../../api'
import CurrencySwitcher from '../CurrencySwitcher'

const useStyles = makeStyles({
	helloContainer: {
		display: 'flex',
		alignItems: 'baseline',
	},
	smallSwitcher: {
		display: 'flex',
		justifyContent: 'center',
		margin: '10px',
	},
	largeSwitcher: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: '110px',
		margin: '15px',
	},
});

const getUpdatedRate = async (oldCurrency, newCurrency, price) =>
	Math.floor(await getConvertedRate(oldCurrency, newCurrency, price))

const getCurracyEnrichedRes = async (newReservation, wantedCurrancy) => {
	let adjustedReservation = { ...newReservation }

	if (newReservation.currency.toUpperCase() != wantedCurrancy.toUpperCase()) {
		adjustedReservation.currency = wantedCurrancy
		adjustedReservation.price = await getUpdatedRate(newReservation.currency, wantedCurrancy, newReservation.price)
	}

	return adjustedReservation;
};

const App = () => {
	const [reservations, setReservetions] = useState([])
	const [currencies, setCurrencies] = useState([]);
	const [currCurrency, setCurrCurrency] = useState('USD');
	const [isDataReady, setIsDataReady] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		const addReservation = resToAdd => setReservetions(reservations => [...reservations, resToAdd])

		subscribeToReservations(async newRes => {
			const updatedRes = {
				...newRes,
				currency: newRes.currency.toUpperCase()
			};
			addReservation(await getCurracyEnrichedRes(updatedRes, currCurrency))
		});

		(async () => setCurrencies(await getAllCurrencies()))();

		return () => { // Cleanup to update the callback with new currancy when needed
			unsubscribeToReservations();
		};
	}, [currCurrency]);

	useEffect(() => {
		let mounted = true;

		const enrichList = async list => {
			Promise.all(list.map(async curr => {
				const newPrice = await getUpdatedRate(curr.currency, currCurrency, curr.price)
				return Object.assign({}, curr, { currency: currCurrency }, { price: newPrice })
			})).then(result => {
				if (mounted) {
					setReservetions(result)
				}
			});
		};

		if (reservations.length > 0) {
			enrichList(reservations)
		}

		return () => {
			mounted = false
		};
	}, [currCurrency])

	useEffect(() => {
		setIsDataReady(true)
	}, [currencies])

	return isDataReady ? (
		< Grid >
			<Grid container
				justify="center"
				alignItems="center">
				<Media queries={{
					small: "(max-width: 799px)",
					large: "(min-width: 800px)"
				}}>
					{matches => {
						const switcher = clsx({
							[classes.smallSwitcher]: matches.small,
							[classes.largeSwitcher]: matches.large,
						});
						const container = clsx({
							[classes.small]: matches.small,
						});
						return (
							<div className={container}>
								<div className={classes.helloContainer}>
									<SVGUpsay />
									<Welcome>Reservations</Welcome>
								</div>
								<div className={switcher}>
									<CurrencySwitcher onChange={setCurrCurrency} currencies={currencies} initial={currCurrency} />
								</div>
							</div>
						)
					}}
				</Media>
			</Grid>
			<Grid item sm={12}>
				<ReservationsList listData={reservations} />
			</Grid>
		</Grid >
	) : ""
};

export default App;
