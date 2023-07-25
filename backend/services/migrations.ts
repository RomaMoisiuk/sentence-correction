import { readFileSync } from 'node:fs';
import { db } from './db';

(() => {
  console.log('Running migrations...');

  db.exec(readFileSync(`${__dirname}/../../sql/corrections.sql`).toString());

  console.log('Succeeded!');
})();
