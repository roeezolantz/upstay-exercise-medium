import { query } from '../pg';

const ENUM_NAME = 'currency'

export const getAllCurrencies = async () => {
    const SELECT_ALL = `SELECT enum_range(NULL::${ENUM_NAME}) AS values`

    try {
        const { rows: [{ values }] } = await query(SELECT_ALL)
        return values.replace(/[{}]/g, '').split(',')
    } catch (error) {
        console.log(error);
    }
}