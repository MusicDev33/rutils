// This file will basically do and install everything needed for RUtils to run. Holy shit, this is gonna be so sexy when
// it's finished. I mean, it'll be ugly. But it'll do cool stuff. And that's sexy. Probably.

import { execSync } from 'child_process';
import process from 'process';
import fs from 'fs';

const MONGO_VERSION = '4.4';
const HOME = '/home/shelby';

const installMongo = () => {
  fs.mkdirSync(`${HOME}/init`);
  process.chdir(`${HOME}/init`);
  
  execSync('sudo apt install gnupg');
  execSync(`wget -q0 - https://www.mongodb.org/static/pgp/server-${MONGO_VERSION}.asc | sudo apt-key add -`).toString('utf-8');

  execSync(`echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/${MONGO_VERSION} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-${MONGO_VERSION}.list`);
  execSync('sudo apt update');

  execSync('sudo apt install -y mongodb-org');
  execSync('sudo systemctl start mongod && sudo systemctl status mongod');
}

(() => {
  

})()
