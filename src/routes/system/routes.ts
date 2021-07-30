import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/drives/space', Routes.getAllDriveUsageRoute);
router.get('/updates', Routes.getNumUpdatesRoute);

export default router;
