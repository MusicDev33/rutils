import { Request, Response } from 'express';
import { execSync } from 'child_process';
import GlobalStatus from 'global';
import axios from 'axios';

export const getOneSysTempRoute = async (_: Request, res: Response) => {
  const temp = parseInt(execSync('cat /sys/class/thermal/thermal_zone0/temp').toString());
  return res.json({temp: (temp / 1000).toString()});
}

export const getAllSysTempRoute = async (_: Request, res: Response) => {
  const temp = parseInt(execSync('cat /sys/class/thermal/thermal_zone0/temp').toString());
  let temps = [{name: 'raspi1', temp: (temp / 1000).toString()}];

  for (let pi of GlobalStatus.getNodes()) {
    try {
      console.log(`Getting temp data for ${pi.hostName}`);
      let res = await axios.get(`http://${pi.ip}:3000/utils/thermals/systemp`);
      let data = res.data;
      let newTemp = parseFloat(data.temp);

      temps.push({name: pi.hostName, temp: (newTemp).toString()});
    } catch (e) {
      console.log(e);
    }
  }

  return res.json({temps});
}
