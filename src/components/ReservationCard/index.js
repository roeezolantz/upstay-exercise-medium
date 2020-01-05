import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import Media from 'react-media';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import DomainIcon from '@material-ui/icons/Domain';
import PinDropIcon from '@material-ui/icons/PinDrop';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const useStyles = makeStyles({
    card: {
        margin: 5,
    },
    title: {
        fontWeight: 'bold',
    },
    hoveredCard: {
        background: "whitesmoke",
    },
    category: {
        flexGrow: 1,
        textAlign: 'center',
        border: '1px red solid',
    },
    small: {
        display: 'block',
        marginBottom: '5px'
    },
    large: {
        display: 'inline-flex',
        marginRight: '15px',
        marginLeft: '15px'
    },
    smallContainer: {
        display: 'block'
    },
    largeContainer: {
        display: 'flex-root',
        justifyContent: 'space-around',
    },
    iconContainer: {
        alignSelf: 'center',
        marginRight: '10px'
    }
});

const ReservationCard = (props) => {
    const classes = useStyles();
    const { reservationData: { uuid, arrival_date, hotel_name, room_name, nights } } = props
    const [hovered, setHovered] = React.useState(false)

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = str => new Date(str).toLocaleDateString("en-US", dateOptions)
    const dayLengthInMS = 86400000;
    const addDays = (date, numOfDays) => new Date(date.getTime() + (dayLengthInMS * numOfDays))

    React.useEffect(() => {
        console.log("The hotel name is : ", hotel_name)
    }, [])

    return (
        <Card className={clsx(classes.card, { [classes.hoveredCard]: hovered })}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}>
            <CardContent>
                <Media queries={{
                    small: "(max-width: 799px)",
                    large: "(min-width: 800px)"
                }}>
                    {matches => {
                        const size = clsx({
                            [classes.small]: matches.small,
                            [classes.large]: matches.large,
                        });
                        const container = clsx({
                            [classes.smallContainer]: matches.small,
                            [classes.largeContainer]: matches.large
                        });

                        return (
                            <div className={container}>
                                <div style={{ marginBottom: '10px' }}>
                                    <div className={size}>
                                        <div className={classes.iconContainer}>
                                            <PinDropIcon />
                                        </div>
                                        <div>
                                            <Typography variant="subtitle1" className={classes.title}> Check-In </Typography>
                                            <Typography variant="subtitle1"> {formatDate(arrival_date)} </Typography>
                                        </div>
                                    </div>
                                    <div className={size}>
                                        <div className={classes.iconContainer}>
                                            <FlightTakeoffIcon />
                                        </div>
                                        <div>
                                            <Typography variant="subtitle1" className={classes.title}> Check-Out </Typography>
                                            <Typography variant="subtitle1"> {formatDate(addDays(new Date(arrival_date), nights))} </Typography>
                                        </div>
                                    </div>
                                    <div className={size}>
                                        <div className={classes.iconContainer}>
                                            <DomainIcon />
                                        </div>
                                        <div>
                                            <Typography variant="subtitle1" className={classes.title}> Hotel </Typography>
                                            <Typography variant="subtitle1"> {hotel_name} </Typography>
                                        </div>
                                    </div>
                                    <div className={size}>
                                        <div className={classes.iconContainer}>
                                            <LocalHotelIcon />
                                        </div>
                                        <div>
                                            <Typography variant="subtitle1" className={classes.title}> Room Type </Typography>
                                            <Typography variant="subtitle1"> {room_name} </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className={size}>
                                    <Typography variant="body2" className={classes.title}> UUID : {uuid}</Typography>
                                </div>
                            </div>
                        )
                    }}
                </Media>
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