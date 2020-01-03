import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        margin: 5,
    },
    hoveredCard: {
        background: "whitesmoke",
    }
});

const ReservationCard = (props) => {
    const classes = useStyles();
    const { reservationData: { uuid, arrival_date, hotel_name, room_name } } = props
    const [hovered, setHovered] = React.useState(false)

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const toDate = str => new Date(str).toLocaleDateString("en-US", dateOptions)

    return (
        <Card className={clsx(classes.card, { [classes.hoveredCard]: hovered })}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}>
            <CardContent>
                <Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body1"> Check-In : </Typography>
                        <Typography variant="subtitle1"> {toDate(arrival_date)} </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1"> Check-Out : </Typography>
                        <Typography variant="body2"> {arrival_date} </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1"> Hotel : </Typography>
                        <Typography variant="body2"> {hotel_name} </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1"> Room : </Typography>
                        <Typography variant="body2"> {room_name} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2"> UUID : {uuid}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

ReservationCard.propTypes = {
    reservationData: PropTypes.shape({
        uuid: PropTypes.string,
        hotel_id: PropTypes.number,
        currency: PropTypes.string,
        price: PropTypes.double,
        guest_name: PropTypes.string,
        room_name: PropTypes.string,
        arrival_date: PropTypes.string,
        nights: PropTypes.number,
        hotel_name: PropTypes.string,
    }).isRequired,
};

export default ReservationCard;