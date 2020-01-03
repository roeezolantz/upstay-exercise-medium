import { query } from '../pg';

const TABLE_NAME = 'public.hotels'

export const getHotelById = async id => {
    const GET_BY_ID = `select name from ${TABLE_NAME} where id=$1`

    if (Number.isInteger(id) && id > 0) {
        try {
            const { rows: [{ name }] } = await query(GET_BY_ID, [id])
            return name;
        } catch (error) {
            console.log(error);
        }
    }
}