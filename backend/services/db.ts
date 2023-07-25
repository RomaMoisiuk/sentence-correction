import path from 'node:path';
import { Database } from 'sqlite3';

export const db = new Database(path.resolve('sentences.db'));
