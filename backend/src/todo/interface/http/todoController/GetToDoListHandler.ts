import { GetToDoList } from '@/todo/application/query/GetToDoList';
import { handler } from '@/_lib/http/handler';


type Dependencies = {
  getToDoList: GetToDoList;
};

const getToDoListHandler = handler(({ getToDoList }: Dependencies) => async (req, res) => {
  const toDos = await getToDoList();
  res.json(toDos);
});

export { getToDoListHandler };
