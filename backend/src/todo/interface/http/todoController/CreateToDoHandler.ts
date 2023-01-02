import { CreateToDo } from '@/todo/application/useCases/CreateToDo';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import Joi from 'types-joi';
import { HttpStatus } from '@/_lib/http/HttpStatus';

type Dependencies = {
  createToDo: CreateToDo;
};

const { getBody } = makeValidator({
  body: Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    textContent: Joi.string().required(),
  }).required(),
});

const createToDoHandler = handler(({ createToDo }: Dependencies) => async (req: Request, res: Response) => {
  const { userId, title, textContent } = getBody(req);

  const toDoId = await createToDo({ userId, title, textContent });

  res.status(HttpStatus.CREATED).json({ id: toDoId });
});

export { createToDoHandler};
