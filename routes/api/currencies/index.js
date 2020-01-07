import express from 'express';
import { getAllCurrencies } from '../../../db/'
import * as http from 'http';
import axios from 'axios';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

const endpoints = {
    convertion: (from, to) => `https://api.exchangeratesapi.io/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`,
    availableList: 'https://api.exchangeratesapi.io/latest'
}

const router = express.Router();

const getConverableCurrencies = async () => {
    try {
        const url = endpoints.availableList

        const ans = await axios.get(url)
        return ans.data
    } catch (err) {
        console.log(err)
    }
}

router.get('/', async (req, res) => {
    try {
        let [optionals, availables] = await Promise.all([getAllCurrencies(), getConverableCurrencies()])
        optionals = optionals.map(c => c.toUpperCase())
        availables = Object.keys(availables.rates).map(c => c.toUpperCase())
        res.json(availables.filter(curr => optionals.includes(curr)))
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});

router.get('/exchangeRates', async (req, res) => {
    const { from, to } = req.query

    if (!from || !to)
        res.send("Please provie \'from\' and \'to\' values as 3 digits represents the needed currency")

    try {
        const url = endpoints.convertion(from, to)

        const ans = await axios.get(url)
        const rate = Object.values(ans.data.rates)[0];

        if (!Number.isNaN(rate)) {

            let obj = {
                'base': from,
                'to': to,
                'value': rate,
            }

            // const currencySignsData = await axios.get("http://www.localeplanet.com/api/auto/currencymap.json")
            // if (currencySignsData.hasOwnProperty(to)) { // I append the symbol if found one
            //     console.log("Adding symbol to the currency")
            //     obj.symbol = currencySignsData[to].symbol
            // }

            res.json(obj);
        } else {
            res.send("Sorry, something went wrong.. Try again later please")
        }

    } catch (error) {
        console.error(error)
        res.send("Please provie \'from\' and \'to\' values as 3 digits represents the needed currency")
    }
})

export default router;
