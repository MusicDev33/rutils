// eslint:disable-next-line
require('tsconfig-paths/register');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';
const cors = require('cors');
import { execSync } from 'child_process';
import axios from 'axios';

import GlobalStatus from './global';
import { RouteName } from './global';

import { validateVitalEnv } from './env.validate';
import { Request, Response } from 'express';

import SysRoutes from '@routes/system/routes';
import FoodRoutes from '@routes/food/routes';

const allRoutes: Array<{prefix: RouteName, routes: Router}> = [
  {prefix: 'sys', routes: SysRoutes},
  {prefix: 'food', routes: FoodRoutes}
];

const version = process.env.npm_package_version;

dotenv.config();
require('dotenv-defaults/config');

let rPis: {hostName: string, ip: string}[];

const NODE_TYPE = validateVitalEnv('NODE_TYPE');

if (NODE_TYPE === 'head') {
  import('machines').then(machines => {
    rPis = machines.rPis;
    GlobalStatus.setNodes(machines.rPis);
    console.log('Raspberry Pi list loaded.')
  });
}

// CONSTANTS
const DB_URI = validateVitalEnv('DB_URI');
const PORT = validateVitalEnv('API_PORT');
const BASE_URL = validateVitalEnv('API_URL_BASE');
console.log(BASE_URL);

try {
  mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
} catch (e) {
  console.log(e);
}

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + DB_URI);
  GlobalStatus.setSysStatus('mongo', 'Online');

  console.log(GlobalStatus.getSystemStatus());
});

mongoose.connection.on('error', (err: any) => {
  const errString = 'Database Error: ' + err;
  console.log(errString);

  // Make Machamp fix the problem sometime
  if (errString.includes('ECONNREFUSED')) {
    console.log('\n\nMy guess is MongoDB is down. Maybe try running `sudo systemctl start mongod`?');
  }
  GlobalStatus.setSysStatus('mongo', 'Offline');

  console.log(GlobalStatus.getSystemStatus());
});

// Create Express instance
const app = express();
app.use(cors());
app.use(express.static('public'));

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

app.get('/alive', (_, res) => {
  res.status(200).json({success: true, msg: 'Node online'});
});

for (let conf of allRoutes) {
  try {
    app.use(`${BASE_URL}/${conf.prefix}`, conf.routes);
    GlobalStatus.setRouteStatus(conf.prefix, 'Online');
  } catch (e) {
    GlobalStatus.setRouteStatus(conf.prefix, 'Offline');
    console.log(e);
  }
}

console.log(GlobalStatus.getRouteStatus());

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
