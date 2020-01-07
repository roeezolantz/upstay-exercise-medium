import axios from 'axios';
import { SERVER_ADDRESS } from '../utils/conf'

const endpoint = {
    all: `${SERVER_ADDRESS}/api/currencies`,
    convertion: (base, to) => `${SERVER_ADDRESS}/api/currencies/exchangeRates?from=${base.toUpperCase()}&to=${to.toUpperCase()}`
}

export const getAllCurrencies = async () => {
    try {
        return (await axios.get(endpoint.all)).data
    } catch (error) {
        console.error(error)
    }
}

export const getConvertedRate = async (base, to, amount) => {
    try {
        if (!base || !to) return false;
        else if (base === to) return 1

        const { data: { value } } = (await axios.get(endpoint.convertion(base, to)))
        return !isNaN(value) && value != 0 ? amount * value : false
    } catch (error) {
        console.error(error)
    }
}