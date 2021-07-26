import dotenv from 'dotenv';
const { exec } = require('child-process-async');

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

export const getAllDriveUsageRoute = async (req: Request, res: Response) => {

}
