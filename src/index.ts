// eslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import { runSpeedTest } from '@automa/speedtest.au';
import cron from 'node-cron';

import { validateVitalEnv } from './env.validate';
import { Response } from 'express';

dotenv.config();
require('dotenv-defaults/config');

// CONSTANTS
const DB_URI = validateVitalEnv('DB_URI');
const PORT = validateVitalEnv('API_PORT');
const BASE_URL = validateVitalEnv('API_URL_BASE');

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + DB_URI);

  cron.schedule('*/30 * * * *', async () => {
    await runSpeedTest();
  })
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Create Express instance
const app = express();

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

app.listen(PORT, () => {
  console.log(`\nRasUtils started in mode '${process.env.NODE_ENV}'`);
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
    console.log('TLS/HTTPS is on.');
  } else {
    console.log('TLS/HTTPS is off.');
  }
  console.log('Port: ' + PORT);
});
