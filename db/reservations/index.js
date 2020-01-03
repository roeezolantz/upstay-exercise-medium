import { query } from '../pg';

const TABLE_NAME = `public.reservations`

export const addReservation = async reservation => {
    const INSERT = `INSERT INTO ${TABLE_NAME} (uuid, hotel_id, currency, price, guest_name, room_name, arrival_date, nights) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`

    if (reservation) {
        try {
            let { rowCount } = await query(INSERT, Object.values(reservation));
            return rowCount == 1;
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllReservations = async () => {
    const GET_ALL = `select * from ${TABLE_NAME}`

    try {
        const { rows } = await query(GET_ALL)
        return rows;
    } catch (error) {
        console.log(error);
    }
}