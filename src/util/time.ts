// I hate util folders but here we are...

export const changeTimeZone = (date: Date, timeZone: string, format?: string) => {
  const newDate = new Date(date.toLocaleString(format ? format : 'en-US', {timeZone: timeZone}));
  return newDate;
}

export enum TimeZones {
  GMT = 'Europe/London',
  MST = 'America/Phoenix'
}
