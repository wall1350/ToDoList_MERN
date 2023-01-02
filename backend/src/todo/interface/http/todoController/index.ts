// import { deleteArticleHandler } from '@/article/interface/http/articleController/DeleteArticleHandler';
import { Router } from 'express';
import { createToDoHandler } from './CreateToDoHandler';
import { getToDoListHandler } from './GetToDoListHandler';
import { deleteToDoHandler } from './DeleteToDoHandler';
import { getToDoInfoHandler } from './GetToDoInfoHandler';
import { editToDoHandler } from './EditToDoHandler';
// import { publishArticleHandler } from './PublishArticleHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeToDoController = ({ apiRouter }: Dependencies) => {
  const router = Router();


  router.get('/todos', getToDoListHandler);
  router.get('/todos/:todoId', getToDoInfoHandler);
  router.post('/todos', createToDoHandler);
  router.delete('/todos/:todoId', deleteToDoHandler);
  router.put('/todos/:todoId', editToDoHandler);
  // router.patch('/articles/:articleId/publish', publishArticleHandler);

  apiRouter.use(router);
};

export { makeToDoController};
