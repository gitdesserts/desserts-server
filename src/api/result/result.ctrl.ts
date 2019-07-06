import { Response, Request } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Result } from '../../entity/Result';

// 주간  그날의 점수, 요일
//

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

  const { month, week } = (await getConnection().query(`
    SELECT FLOOR((DATE_FORMAT('${date}','%d')+(date_format(date_format('${date}','%Y%m%01'),'%w')-1))/7)+1 week, month('${date}') month;
  `))[0];

  rawResults.forEach(rawResult => {
    const index = parseInt(rawResult['day']);
    result[index] = rawResult['score'];
  });

  for (let index = 0; index < 7; index++) {
    if (!result[index]) result[index] = 0;
  }

  res.send({ month: parseInt(month), week, result });
};

export const findThisMonth = async (req: Request, res: Response) => {};
