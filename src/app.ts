import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('express');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('sever start');
});
