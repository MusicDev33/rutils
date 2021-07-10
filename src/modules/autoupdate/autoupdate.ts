require('tsconfig-paths/register');
import ssh2prom = require('ssh2-promise');
import dotenv from 'dotenv';
import axios from 'axios';
const fs = require('fs').promises;
import { validateVitalEnv } from 'env.validate';
const { exec } = require('child-process-async');

import { rPis } from 'machines';

const pLockUrl = 'https://raw.githubusercontent.com/MusicDev33/rutils/master/package-lock.json';

dotenv.config();
require('dotenv-defaults/config');

const PRIVATE_KEY = validateVitalEnv('PRIVATE_SSH_KEY');

(async function() {

  for (let rpi of rPis) {
    let sshConfig = {
      host: rpi.hostName,
      username: 'shelby',
      identity: PRIVATE_KEY
    }

    const ssh = new ssh2prom(sshConfig);

    await ssh.connect();
    console.log(`Connection to ${rpi.hostName} established.`);
    try {
      let folders = await ssh.exec('cd rportal && git reset --hard HEAD && git pull origin main');
      console.log(folders.toString());
    } catch (e) {
      console.log(e.toString());
    }

    await ssh.exec('pm2 restart rutils');
    console.log('Restarted RUtils');

    await ssh.close();
    console.log(`Connection to ${rpi.hostName} closed.`);
  }
})();
