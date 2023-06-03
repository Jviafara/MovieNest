import express from 'express';
import mediaRoute from './media.route.js';
import personRoute from './person.route.js';
import reviewRoute from './review.route.js';
import userRoute from './user.route.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/:mediaType', mediaRoute);
router.use('/person', personRoute);
router.use('/reviews', reviewRoute);

export default router;
