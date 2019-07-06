import * as dotenv from 'dotenv';
import * as express from 'express';
import { createConnection } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;

createConnection({
  type: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
  host: DB_HOST,
  database: DB_NAME,
  synchronize: false,
  entities: [],
  dropSchema: false
}).then(async () => {
  const app: express.Application = express();

  app.get('/', (req, res) => {
    res.send('express');
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Sever start http://localhost:${process.env.PORT || 3000}`);
  });
});
