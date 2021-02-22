import axios from 'axios';
import cheerio from 'cheerio';
import { parseTables } from './table.parse';

const BASE_URL = 'https://minecraft.gamepedia.com/';

export const start = async (startUrl: string): Promise<string> => {
  const url = BASE_URL + startUrl;

  const response = await axios.get(url);
  const data = await response.data;
  const $ = cheerio.load(data);
  return parseTables($);
}
