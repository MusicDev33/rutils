/*

Cheerio sucks. I hate it. The documentation is poor, the UX for it is awful,
and honestly, it feels like it's supposed to be flexible, but it never feels like
the powerful tool it's supposed to be. Again, this could all just be from terrible documentation,
but regardless, I'm writing a wrapper around this garbage.

*/

import cheerio from 'cheerio';

export const addNode = (nodeString: string, locationString: string, docString: string): string => {
  const node = cheerio.load(nodeString);

  const doc = cheerio.load(docString);
  doc(locationString).append(nodeString);

  return doc.html();
}
