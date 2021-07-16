import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/drives/space', Routes.getAllDriveUsageRoute);

export default router;
