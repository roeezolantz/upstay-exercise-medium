import express from 'express';
import reservations from './reservations';
import currencies from './currencies'

const router = express.Router();

router.use('/reservations', reservations);
router.use('/currencies', currencies);

export default router;
