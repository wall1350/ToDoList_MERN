import { DeleteToDo } from '@/todo/application/useCases/DeleteToDo';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import { HttpStatus } from '@/_lib/http/HttpStatus';

type Dependencies = {
  deleteToDo: DeleteToDo;
};

const deleteToDoHandler = handler(({ deleteToDo }: Dependencies) => async (req: Request, res: Response) => {
  const { todoId } = req.params;

  const deleteResult = await deleteToDo({ todoId });

  res.status(HttpStatus.CREATED).json({ deleteResult: deleteResult });
});

export { deleteToDoHandler};
