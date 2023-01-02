import { QueryResult, QueryHandler,Query} from '@/_lib/CQRS';

type ToDoListItemDTO = Readonly<{
  id: string;
  userId: string;
  title: string;
  textContent: string;
  highlightFlag: boolean;
  progessStatus: string;
}>;

type TodoFilter = {
  id: string;
};

type GetToDoInfo = QueryHandler<Query<TodoFilter>, QueryResult<ToDoListItemDTO[]>>;

export { GetToDoInfo,TodoFilter };
