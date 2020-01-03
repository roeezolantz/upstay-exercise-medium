import { query } from './pg';

export const addReservation = async reservation => {
    const TABLE_NAME = `public.reservations`
    const INSERT_RESERVATIONS = `INSERT INTO ${TABLE_NAME} (uuid, hotel_id, currency, price, guest_name, room_name, arrival_date, nights) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`

    try {
        let { rowCount } = await query(INSERT_RESERVATIONS, Object.values(reservation));
        return rowCount == 1;
    } catch (error) {
        console.log(error);
    }
}

export const getAllReservations = async () => {
    const TABLE_NAME = `public.reservations`
    const GET_ALL_RESERVATIONS = `select * from reservations`

    try {
        const { rows } = await query(GET_ALL_RESERVATIONS)
        return rows;
    } catch (error) {
        console.log(error);
    }
}