import { GetToDoInfo, TodoFilter } from '@/todo/application/query/GetToDoInfo';
import { Query } from '@/_lib/CQRS';
import { NotFoundError } from '@/_lib/errors/NotFoundError';
import { handler } from '@/_lib/http/handler';


type Dependencies = {
  getToDoInfo: GetToDoInfo;
};

const getToDoInfoHandler = handler(({ getToDoInfo }: Dependencies) => async (req, res) => {
  const { todoId } = req.params;
 
  // should add joi in here
  if (!todoId) {
    throw NotFoundError.create();
  }
  else{
    let todoFilter:Query<TodoFilter>={
      filter: {
        id: todoId
      }
    }
    const toDo = await getToDoInfo(todoFilter);
    res.json(toDo);
  }
});

export { getToDoInfoHandler };
