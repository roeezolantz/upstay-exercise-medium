import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';

const CurrencySwitcher = (props) => {
    const [currCurrency, setCurrCurrency] = useState(props.initial || 'USD');
    const { currencies } = props;

    return (
        <FormControl variant="outlined">
            <Select style={{ width: '110px' }}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currCurrency}
                onChange={(e) => {
                    if (e.target.value != currCurrency) {
                        setCurrCurrency(e.target.value);
                        props.onChange && props.onChange(e.target.value);
                    }
                }}
            >
                {
                    currencies.map(curr => <MenuItem key={curr} value={curr}>{curr}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default CurrencySwitcher

CurrencySwitcher.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    initial: PropTypes.string,
};