import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.post('/search', Routes.getFoodBySearchRoute);
router.get('/test', Routes.testEndpointRoute);

router.post('/create', Routes.addFoodRoute);

export default router;
