// eslint:disable-next-line
require('tsconfig-paths/register');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
const cors = require('cors');
import { execSync } from 'child_process';
import axios from 'axios';
const { version } = require('../package,json');

import { validateVitalEnv } from './env.validate';
import { Request, Response } from 'express';

dotenv.config();
require('dotenv-defaults/config');

let rPis: {hostName: string, ip: string}[];

const NODE_TYPE = validateVitalEnv('NODE_TYPE');

if (NODE_TYPE === 'head') {
  import('machines').then(machines => {
    rPis = machines.rPis;
    console.log('Raspberry Pi list loaded.')
  });
}

// CONSTANTS
const DB_URI = validateVitalEnv('DB_URI');
const PORT = validateVitalEnv('API_PORT');
const BASE_URL = validateVitalEnv('API_URL_BASE');
console.log(BASE_URL);

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + DB_URI);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Create Express instance
const app = express();
app.use(cors());
app.set('view engine', 'pug');
app.use(express.static('public'));
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.get(BASE_URL, (_, res: Response) => {
  console.log(`Test API Base: ${BASE_URL}`);
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.get('/', (_, res: Response) => {
  console.log(`Test API Base: ${BASE_URL}`);
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.get(`${BASE_URL}/cpudata`, async (_, res: Response) => {
  // this is meant to run on Linux. If I can find some way to get this output
  // on MacOS, I will add that, but for now, MacOS will use sample data from
  // a Raspberry Pi 4.
  if (process.platform === 'darwin') {
    let results = `Linux 5.4.0-1015-raspi (ubuntu) 	12/14/20 	_aarch64_	(4 CPU)

    23:21:07     CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
    23:21:07     all    0.14    0.01    0.25    0.01    0.00    0.01    0.00    0.00    0.00   99.58
    23:21:07       0    0.13    0.01    0.24    0.01    0.00    0.01    0.00    0.00    0.00   99.61
    23:21:07       1    0.15    0.01    0.26    0.01    0.00    0.00    0.00    0.00    0.00   99.57
    23:21:07       2    0.14    0.01    0.25    0.01    0.00    0.01    0.00    0.00    0.00   99.59
    23:21:07       3    0.15    0.01    0.26    0.01    0.00    0.01    0.00    0.00    0.00   99.56`
    .split('\n');

    results.shift();
    results.shift();
    results.shift();

    type Usage = {cpu: string, usage: string};

    let exportResults: Usage[] = [];

    exportResults = results.map((row: string) => {
      const rowData = row.trim().replace(/\s+/g, ' ').split(' ');

      const cpuUsage = 100 - parseFloat(rowData[rowData.length - 1]);
      const cpuName = rowData[1];
      const usage: Usage = {
        cpu: cpuName,
        usage: cpuUsage.toFixed(2)
      }

      return usage;
    });

    // return res.send(exportResults);
    return res.json({results: exportResults});
  }

  try {
    const results = execSync('mpstat -P ALL 1 1').toString('utf-8').split('\n');
    console.log(results);
    results.shift();
    results.shift();
    results.shift();

    if (results.includes('PM') || results.includes('AM')) {
      results.shift();
    }

    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();

    type Usage = {cpu: string, usage: string};

    let exportResults: Usage[] = [];

    exportResults = results.map((row: string) => {
      const rowData = row.trim().replace(/\s+/g, ' ').split(' ');

      const cpuUsage = 100 - parseFloat(rowData[rowData.length - 1]);
      const cpuName = rowData[1];
      const usage: Usage = {
        cpu: cpuName,
        usage: cpuUsage.toFixed(2)
      }

      return usage;
    });

    return res.json({results: exportResults});
  } catch (e) {
    console.log(e);
    return res.send('error');
  }
});

app.get(`${BASE_URL}/thermals/systemp`, async (req: Request, res: Response) => {
  const temp = parseInt(execSync('cat /sys/class/thermal/thermal_zone0/temp').toString());
  return res.json({temp: (temp / 1000).toString()});

});

app.get(`${BASE_URL}/thermals/systemp/all`, async (req: Request, res: Response) => {
  const temp = parseInt(execSync('cat /sys/class/thermal/thermal_zone0/temp').toString());
  let temps = [{name: 'raspi2', temp: (temp / 1000).toString()}];

  for (let pi of rPis) {
    try {
      console.log(`Getting temp data for ${pi.hostName}`);
      let res = await axios.get(`http://${pi.ip}:3000/utils/thermals/systemp`);
      let data = res.data;
      let newTemp = parseFloat(data.temp);

      if (pi.hostName === 'raspi1') {
        temps.unshift({name: pi.hostName, temp: (newTemp).toString()});
      } else {
        temps.push({name: pi.hostName, temp: (newTemp).toString()});
      }
    } catch (e) {
      console.log(e);
    }
  }

  return res.json({temps});

});

app.listen(PORT, () => {
  console.log(`\nRUtils started in mode '${process.env.NODE_ENV}'`);
  console.log(`Version ${version}`);
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
    console.log('TLS/HTTPS is on.');
  } else {
    console.log('TLS/HTTPS is off.');
  }
  console.log(`Base URL: ${BASE_URL}`);
  console.log('Port: ' + PORT);
});
