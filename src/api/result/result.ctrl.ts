import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../../entity/Result';

export const create = async (req: Request, res: Response) => {
  const { results } = req.body;
  let score = 0;

  (results as Array<Object>).forEach(result => {
    score += parseInt(result['score']);
  });

  try {
    const result = await getRepository(Result).save({
      creator: 1,
      score
    });
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
