import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/:item', RouteFunctions.getMCPageRoute);

export default router;
