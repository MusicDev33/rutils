import express from 'express';
const router = express.Router();
import * as Routes from './export';

router.get('/drives/space', Routes.getAllDriveUsageRoute);
router.get('/updates', Routes.getNumUpdatesRoute);
router.get('/cpudata', Routes.getOneCpuDataRoute);

router.get('/pingblink', Routes.pingBlinkRoute);

router.get('/thermals/systemp', Routes.getOneSysTempRoute);
router.get('/thermals/systemp/all', Routes.getAllSysTempRoute);

export default router;
