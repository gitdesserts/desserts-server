import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

const hasLastWeekResults = async (user: string) => {
  const { cnt } = (await getConnection().query(`
    SELECT
      COUNT(*) as cnt
    FROM result
    WHERE YEARWEEK(DATE_SUB(curdate(), INTERVAL 1 WEEK))=YEARWEEK(createAt)
      AND creator=${user}`))[0];
  return cnt !== 0;
};

const hasLastMonthResults = async (user: string) => {
  const { cnt } = (await getConnection().query(`
    SELECT
      COUNT(*) as cnt
    FROM result
    WHERE MONTH(DATE_SUB(curdate(), INTERVAL 1 MONTH))=MONTH(createAt)
      AND YEAR(DATE_SUB(curdate(), INTERVAL 1 MONTH))=YEAR(createAt)
      AND creator=${user}`))[0];
  return cnt !== 0;
};

const getLastWeekResultsAvg = async (user: string) => {
  const { avg } = (await getConnection().query(`
    SELECT
      AVG(score) as avg
    FROM result
    WHERE YEARWEEK(DATE_SUB(curdate(), INTERVAL 1 WEEK), 1)=YEARWEEK(createAt, 1)
      AND creator=${user}`))[0];
  return avg;
};

const getThisWeekResultsAvg = async (user: string) => {
  const { avg } = (await getConnection().query(`
  SELECT
    AVG(score) as avg
  FROM result
  WHERE YEARWEEK(curdate(), 1)=YEARWEEK(createAt, 1)
    AND creator=${user}`))[0];
  return avg;
};

const getThisMonthResultAvg = async (user: string) => {
  const { avg } = (await getConnection().query(`
  SELECT
    AVG(score) as avg
  FROM result
  WHERE MONTH(curdate())=MONTH(createAt)
    AND YEAR(curdate())=YEAR(createAt)
    AND creator=${user}`))[0];
  return avg;
};

const getLastMonthResultAvg = async (user: string) => {
  const { avg } = (await getConnection().query(`
  SELECT
    AVG(score) as avg
  FROM result
  WHERE MONTH(DATE_SUB(curdate(), INTERVAL 1 MONTH))=MONTH(createAt)
    AND YEAR(DATE_SUB(curdate(), INTERVAL 1 MONTH))=YEAR(createAt)
    AND creator=${user}`))[0];
  return avg;
};

export const findOne = async (req: Request, res: Response) => {
  const { user } = req.query;
  let code = '';

  if (!(await hasLastWeekResults(user))) {
    code += 'A';
    if ((await getThisWeekResultsAvg(user)) >= 5) {
      code += 'A';
    } else {
      code += 'B';
    }
  } else {
    code += 'B';
    const lastWeekAvg = await getLastWeekResultsAvg(user);
    if (!(await hasLastMonthResults(user))) {
      const thisWeekAvg = getThisWeekResultsAvg(user);
      code += lastWeekAvg > thisWeekAvg ? 'A' : 'B';
    } else {
      const thisMonthAvg = await getThisMonthResultAvg(user);
      const lastMonthAvg = await getLastMonthResultAvg(user);
      const thisWeekAvg = await getThisWeekResultsAvg(user);
      const lastWeekAvg = await getLastWeekResultsAvg(user);

      code += lastMonthAvg > thisMonthAvg ? 'A' : 'B';
      code += lastWeekAvg > thisWeekAvg ? 'A' : 'B';
    }
  }

  const insight = (await getConnection().query(`
    SELECT * FROM insight WHERE code = '${code}' order by rand() limit 1
  `))[0];

  res.send(insight);
};
