import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { ToDo } from '@/todo/domain/ToDo';
import { ApplicationService } from '@/_lib/DDD';
import { ToDoCreatedEvent } from '@/todo/application/events/ToDoCreatedEvent';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';

type Dependencies = {
  todoRepository: ToDoRepository;
};

type CreateToDoDTO = {
  userId: string;
  title: string;
  textContent: string;
};

type CreateToDo = ApplicationService<CreateToDoDTO, string>;

const makeCreateToDo = eventProvider<Dependencies, CreateToDo>(
  ({ todoRepository }, enqueue) =>
    async (payload: CreateToDoDTO) => {
      const id = await todoRepository.getNextId();

      const todoItem = ToDo.createToDo({
        id,
        userId: payload.userId,
        title: payload.title,
        textContent: payload.textContent,
      });

      await todoRepository.store(todoItem);

      enqueue(ToDoCreatedEvent.createEvent(todoItem));

      return id.value;
    }
);

export { makeCreateToDo };
export type { CreateToDo };
