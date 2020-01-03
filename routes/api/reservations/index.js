import express from 'express';
import { getAllReservations } from '../../../db/reservations'

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Fetching reservations from the db...");
    let result;

    try {
        result = await getAllReservations()
        console.log("getAllReservations returned : ", result)
        res.json(result);
    } catch (error) {
        res.sendStatus(500).send(error)
    }
});

export default router;
