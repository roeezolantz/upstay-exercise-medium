import express from 'express';
import { getAllReservations } from '../../../db/reservations'

const router = express.Router();

router.get('/', async (req, res) => {
    let result;

    try {
        result = await getAllReservations()
        res.json(result);
    } catch (error) {
        res.sendStatus(500).send(error)
    }
});

export default router;
