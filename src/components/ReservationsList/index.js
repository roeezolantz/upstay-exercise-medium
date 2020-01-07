import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ReservationCard from '../ReservationCard'

const ReservationsList = (props) => {
    const [filter, setFilter] = React.useState('')
    const { listData } = props

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
            <div>
                {
                    listData && listData.length > 0 ? (
                        listData
                            .filter(curr => curr.uuid.includes(filter))
                            .map(curr => <ReservationCard key={curr.uuid} reservationData={curr} />)
                    ) : "There are no reservation right now, come back later.."
                }
            </div>
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
        }).isRequired
    ).isRequired,
};

export default ReservationsList;