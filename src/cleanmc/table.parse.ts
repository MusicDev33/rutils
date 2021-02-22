import cheerio from 'cheerio';
import { addNode } from 'recheer/recheer';

export const parseTables = ($: cheerio.Root): string => {
  let bs = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
`;

  let html = cheerio.load(`<html><head>${bs}</head><body class="container-fluid"></body></html>`);

  let tableArr: cheerio.Element[] = [];

  const tables = $('table.wikitable').each((index, element) => {
    tableArr.push(element);
  });

  tableArr.forEach(element => {
    const test = cheerio.load($.html(element))
    console.log('\n\n\n\n\n\n\n\n\n');
    const newTable = `<div class="row"><div class="col-6"><table class="table test">${test('tbody').html()}</table></div></div>`;
    html('html').append(newTable);
  });

  // console.log(html.html());
  return html.html() as string;
}
