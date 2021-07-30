require('tsconfig-paths/register');
import ssh2prom = require('ssh2-promise');
import dotenv from 'dotenv';
import { validateVitalEnv } from 'env.validate';

import { rPis } from 'machines';

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
      let folders = await ssh.exec('cd rutils && git reset --hard HEAD');
      console.log(folders.toString());
    } catch (e) {
      console.log(e.toString());
    }

    try {
      let folders = await ssh.exec('cd rutils && git pull origin master');
      console.log(folders.toString());
    } catch (e) {
      console.log(e.toString());
    }

    try {
      console.log('Updating NPM packages...');
      let update = await ssh.exec('cd rutils && npm i');
      console.log('Updated NPM packages');
      console.log(update);
    } catch (e) {
      console.log(e.toString());
    }

    await ssh.exec('pm2 restart rutils');
    console.log('Restarted RUtils');

    await ssh.close();
    console.log(`Connection to ${rpi.hostName} closed.`);
  }
})();
