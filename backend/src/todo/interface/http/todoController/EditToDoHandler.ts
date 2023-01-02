import { EditToDo } from '@/todo/application/useCases/EditToDo';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import Joi from 'types-joi';
import { HttpStatus } from '@/_lib/http/HttpStatus';
import { ToDoIdProvider } from '@/_sharedKernel/infrastructure/ToDoIdProvider';

type Dependencies = {
  editToDo: EditToDo;
};
const { getBody } = makeValidator({
  body: Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    textContent: Joi.string().required(),
    highlightFlag:Joi.boolean().required(),
    progessStatus: Joi.string().required(),
  }).required(),
});


const editToDoHandler = handler(({ editToDo }: Dependencies) => async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { userId, title, textContent,highlightFlag,progessStatus} = getBody(req);

  const toDoId = await editToDo({ id:ToDoIdProvider.create(todoId), userId, title, textContent,highlightFlag,progessStatus});

  res.status(HttpStatus.CREATED).json({ id: toDoId });
});


export { editToDoHandler};
