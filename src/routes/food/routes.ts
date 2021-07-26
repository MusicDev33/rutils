import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/search/:searchTerm', Routes.getFoodBySearchRoute);
router.get('/test', Routes.testEndpointRoute);

router.post('/create', Routes.addFoodRoute);

export default router;
