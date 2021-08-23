import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/drives/space', Routes.getAllDriveUsageRoute);
router.get('/updates', Routes.getNumUpdatesRoute);
router.get('/cpudata', Routes.getOneCpuDataRoute);

router.get('/thermals/temp', Routes.getOneSysTempRoute);
router.get('/thermals/temp/all', Routes.getAllSysTempRoute);

export default router;
