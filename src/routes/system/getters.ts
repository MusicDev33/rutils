import dotenv from 'dotenv';
import { platformSupported } from '@util/sys-support';
const { exec } = require('child-process-async');

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

const EX_STORAGE = process.env.EX_STORAGE as string;
const exStorage: {name: string, mount: string}[] = [];

if (EX_STORAGE !== 'none') {
  const devices = EX_STORAGE.split(',');
  for (let device of devices) {
    const data = device.split(':');
    const deviceObj = {
      name: data[0],
      mount: data[1]
    }

    exStorage.push(deviceObj);
  }
}

export const getAllDriveUsageRoute = async (req: Request, res: Response) => {
  const data: {name: string, usage: string, total: string}[] = [];

  for (let device of exStorage) {
    const { stdout } = await exec(`df -H ${device.mount}`);
    const dataOutput = (stdout as string).split('\n')[1].replace(/\s+/g, ' ').split(' ');

    data.push({
      name: device.name,
      usage: dataOutput[4].substring(0, dataOutput[4].length - 1),
      total: dataOutput[1]
    });
  }

  return res.json({success: true, data});
}

export const getNumUpdatesRoute = async (req: Request, res: Response) => {
  let data: {name: string, regUpdates: string, secUpdates: string}[] = [];

  if (!platformSupported(['linux'])) {
    return res.status(503).json({success: false, message: 'Platform not supported'});
  }

  const updates = (await exec(`/usr/lib/update-notifier/apt-check`)).stdout as string;
  const regUpdates = updates.split(';')[0];
  const secUpdates = updates.split(';')[1];

  // data.push({name: 'Raspi1', regUpdates: regUpdates.trim(), secUpdates: secUpdates.trim()});

  return res.json({success: true, message: 'Received update data', payload: updates});
}

export const pingBlinkRoute = async (req: Request, res: Response) => {
  
}

export const statusRoute = async (req: Request, res: Response) => {
  return res.json({success: true, message: 'System routes are online.'});
}
