import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, TextField, IconButton, InputAdornment } from '@material-ui/core';
import ReservationCard from '../ReservationCard'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
});

const ReservationsList = (props) => {
    const [filter, setFilter] = React.useState('')
    const classes = useStyles();
    const { listData } = props
    console.log(classes);

    React.useEffect(() => console.log("filter changed : ", filter), [filter])

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <TextField
                id="uuid-filter"
                label="Filter by UUID"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                onChange={e => setFilter(e.target.value)}
            />
            {
                listData
                    .filter(curr => curr.uuid.includes(filter))
                    .map(curr => <ReservationCard key={curr.uuid} reservationData={curr} />)
            }
        </Grid>
    );
}

ReservationsList.propTypes = {
    listData: PropTypes.arrayOf(
        PropTypes.shape({
            uuid: PropTypes.string,
            hotel_id: PropTypes.number,
            currency: PropTypes.string,
            price: PropTypes.double,
            guest_name: PropTypes.string,
            room_name: PropTypes.string,
            arrival_date: PropTypes.string,
            nights: PropTypes.number,
            hotel_name: PropTypes.string,
        })
    ),
};

export default ReservationsList;