# RUtils Backend Dev Note
Because TypeScript can complicate things, run the backend using this:

`pm2 start npm --name=rutils -- run start`

### For Production
`pm2 start npm --name=rutilsprod -- run prod`

### For Remote Dev
`pm2 start npm --name=rutilsdev -- run dev`

#### Notes

We use a separate `models` folder to house all interfaces that will also be used as objects in the database.

##### Cron in .env

To use Cron, you put your crontab in the .env file, with each space replaced with a plus sign. An example:

`*/30 * * * *` = `*/30+*+*+*+*`

### For RasPi

Raspberry Pis run on ARM, so here's how I get RUtils to run on RPi:

- Node 14
- Add Python 2 to `PYTHON`
    - `echo "export PYTHON=/usr/bin/python2" >> ~/.bashrc && source ~/.bashrc`
- `npm i` and if you've already tried building `node-gyp`, then `npm rebuild node-gyp`
