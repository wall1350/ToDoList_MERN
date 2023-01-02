import { ToDo } from '@/todo/domain/ToDo';
import { Repository } from '@/_lib/DDD';

type ToDoRepository = Repository<ToDo.Type> & {
  findById(id: string): Promise<ToDo.Type>;
  deleteById(id: string): Promise<string>;
};

export { ToDoRepository };
