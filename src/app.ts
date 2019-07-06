import * as dotenv from 'dotenv';
import * as express from 'express';
import { createConnection } from 'typeorm';
import entities from './entity';
import user from './api/user';
import question from './api/question';
import result from './api/result';

dotenv.config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;

createConnection({
  type: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
  host: DB_HOST,
  database: DB_NAME,
  logging: true,
  synchronize: true,
  entities: entities
}).then(async () => {
  const app: express.Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('express');
  });

  app.use('/', user);
  app.use('/questions', question);
  app.use('/results', result);

  //app.use('/dosc', swaggerDoc);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Sever start http://localhost:${process.env.PORT || 3000}`);
  });
});
