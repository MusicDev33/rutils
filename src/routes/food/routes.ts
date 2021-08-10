import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.post('/search', Routes.getFoodBySearchRoute);

// Just gives the last ten food items put into the DB
router.get('/', Routes.getFoodRoute);

router.get('/test', Routes.testEndpointRoute);

router.post('/create', Routes.addFoodRoute);

export default router;
