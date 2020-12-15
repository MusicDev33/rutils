// eslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import { runSpeedTest } from '@automa/speedtest.au';
import cron from 'node-cron';
import path from 'path';
import { execSync } from 'child_process';
const jsStringify = require('js-stringify');

import { cronParse } from './cronparse';

import { validateVitalEnv } from './env.validate';
import { Response } from 'express';
import SpeedTestService from '@services/speed-test.service';

dotenv.config();
require('dotenv-defaults/config');

// CONSTANTS
const DB_URI = validateVitalEnv('DB_URI');
const PORT = validateVitalEnv('API_PORT');
const BASE_URL = validateVitalEnv('API_URL_BASE');
// In minutes
const SPEEDTEST_INTERVAL = cronParse(validateVitalEnv('SPEEDTEST_INTERVAL'));

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + DB_URI);

  cron.schedule(SPEEDTEST_INTERVAL, async () => {
    await runSpeedTest();
  })
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Create Express instance
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.get(BASE_URL, (_, res: Response) => {
  console.log(`Test API Base: ${BASE_URL}`);
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});



app.get(`${BASE_URL}/test`, async (_, res: Response) => {
  const query = {

  };
  const speedTests = await SpeedTestService.findModelsByQuery(query, {_id: -1}, 800);

  // Set some interval, and calculate the average speeds at that interval


  res.render('speedchart/view', {basedir: path.join(__dirname, 'views')});
});

app.get(`${BASE_URL}/cpu`, async (_, res: Response) => {

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
    return res.render('cpu/view', {basedir: path.join(__dirname, 'views'), results: JSON.stringify(exportResults)});
  }

  try {
    const results = execSync('mpstat -P ALL 1 1').toString('utf-8').split('\n');
    results.shift();
    results.shift();
    results.shift();

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

    return res.render('cpu/view', {basedir: path.join(__dirname, 'views'), results: JSON.stringify(exportResults)});
  } catch (e) {
    console.log(e);
    return res.send('error');
  }
});

app.get(`${BASE_URL}/test2`, async (_, res: Response) => {
  const speedTests = await SpeedTestService.findModelsByQuery({}, {_id: -1}, 800);

  return res.json({speedTests});
});


console.log(`SpeedTest cron is ${SPEEDTEST_INTERVAL}`);
app.listen(PORT, () => {
  console.log(`\nRasUtils started in mode '${process.env.NODE_ENV}'`);
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
    console.log('TLS/HTTPS is on.');
  } else {
    console.log('TLS/HTTPS is off.');
  }
  console.log('Port: ' + PORT);
});
