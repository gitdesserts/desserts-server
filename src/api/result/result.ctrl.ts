import { Response, Request } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Result } from '../../entity/Result';

const getMonthAndWeek = async (date: string) =>
  (await getConnection().query(`
    SELECT FLOOR((DATE_FORMAT('${date}','%d')+(date_format(date_format('${date}','%Y%m%01'),'%w')-1))/7)+1 week, month('${date}') month;
  `))[0];

const getYearAndMonth = async (date: string) =>
  (await getConnection().query(`
    SELECT YEAR('${date}') year, month('${date}') month;
    `))[0];

const getLastDay = async (date: string) =>
  (await getConnection().query(`
SELECT (DATE_FORMAT(LAST_DAY('${date}'), '%e')) as lastDay`))[0];

export const create = async (req: Request, res: Response) => {
  const { results } = req.body;
  let score = 5;

  (results as Array<Object>).forEach(result => {
    score += parseInt(result['score']);
  });

  try {
    const result = await getRepository(Result).save({
      creator: 1,
      score
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findFromWeek = async (req: Request, res: Response) => {
  const { date } = req.query;
  const result = [];

  const rawResults = await getConnection().query(`
    SELECT id, score, createAt, WEEKDAY(createAt) as day FROM result WHERE YEARWEEK('${date}', 1) = YEARWEEK(createAt, 1)
  `);

  const { month, week } = await getMonthAndWeek(date);

  rawResults.forEach(rawResult => {
    const index = parseInt(rawResult['day']);
    result[index] = rawResult['score'];
  });

  for (let index = 0; index < 7; index++) {
    if (!result[index]) result[index] = -1;
  }

  res.send({ month: parseInt(month), week, result });
};

export const findAllFromMonth = async (req: Request, res: Response) => {
  const { date } = req.query;
  const { month, year } = await getYearAndMonth(date);
  const result = [];

  const rawResults = await getConnection().query(`
    SELECT (DATE_FORMAT(createAt, '%e')) as day, score FROM result WHERE month(createAt)=month('${date}') AND year(createAt) = year('${date}');
  `);
  const { lastDay } = await getLastDay(date);

  rawResults.forEach(rawResult => {
    const index = parseInt(rawResult['day']);
    result[index - 1] = parseInt(rawResult['score']);
  });

  for (let index = 0; index < parseInt(lastDay); index++) {
    if (!result[index]) result[index] = -1;
  }

  res.send({ month: parseInt(month), year: parseInt(year), result });
};
