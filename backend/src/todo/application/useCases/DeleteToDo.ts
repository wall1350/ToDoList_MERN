import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { ApplicationService } from '@/_lib/DDD';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';
import { ToDoDeletedEvent } from '../events/ToDoDeletedEvent';

type Dependencies = {
  todoRepository: ToDoRepository;
};

type DeleteToDoDTO = {
  todoId: string;
};

type DeleteToDo = ApplicationService<DeleteToDoDTO, string>;

const makeDeleteToDo = eventProvider<Dependencies, DeleteToDo>(
  ({ todoRepository }, enqueue) =>
    async (payload: DeleteToDoDTO) => {
      
      const deleteResult = await todoRepository.deleteById(payload.todoId);
      enqueue(ToDoDeletedEvent.createEvent(payload.todoId));

      return deleteResult;
    }
);

export { makeDeleteToDo };
export type { DeleteToDo };
