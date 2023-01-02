import { QueryResult, QueryHandler} from '@/_lib/CQRS';

type ToDoListItemDTO = Readonly<{
  id: string;
  userId: string;
  title: string;
  textContent: string;
  highlightFlag: boolean;
  progessStatus: string;
}>;

type GetToDoList = QueryHandler<void, QueryResult<ToDoListItemDTO[]>>;

export { GetToDoList };
