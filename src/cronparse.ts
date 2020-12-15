// takes the crontab from the .env or .env.default and converts it to
// cron

export const cronParse = (preCron: string) => {
  return preCron.replace(/[+]/g, ' ');
}
