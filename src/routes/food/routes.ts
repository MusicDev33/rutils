import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/search/:searchTerm', Routes.getFoodBySearch);
router.post('/create', Routes.addFoodRoute);

export default router;
