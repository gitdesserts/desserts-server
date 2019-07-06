import { Response, Request } from 'express';
import { Question } from '../../entity/Question';
import { User } from '../../entity/User';
import { getRepository, getConnection } from 'typeorm';

const POSITIVE = 1;
const NEGATIVE = 2;
const NOMAL = 3;

const getQuestion = async (type: number, limit: number) =>
  await getConnection().query(
    `SELECT
      question.id as id,
      content,
      type.name as type
    FROM question, type
    WHERE question.type=type.id
      AND question.type=${type}
    ORDER BY RAND() LIMIT ${limit};`
  );

export const find = async (req: Request, res: Response) => {
  // FIXME ...
  const positiveQuestions = await getQuestion(POSITIVE, 2);
  const negativeQuestions = await getQuestion(NEGATIVE, 2);
  const normalQuestions = await getQuestion(NOMAL, 1);

  res.send({
    questions: [...positiveQuestions, ...negativeQuestions, ...normalQuestions]
  });
};
