import dotenv from 'dotenv';
import { platformSupported } from '@util/sys-support';
const { exec } = require('child-process-async');
import { Request, Response } from 'express';
import amq from 'amqplib';


export const scheduleSysUpdatesRoute = (req: Request, res: Response) => {
    
}
