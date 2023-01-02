import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { ToDo } from '@/todo/domain/ToDo';
import { ApplicationService } from '@/_lib/DDD';
import { ToDoEditedEvent } from '@/todo/application/events/ToDoEditedEvent';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';
import { ToDoId } from '@/_sharedKernel/domain/ToDoId';

type Dependencies = {
  todoRepository: ToDoRepository;
};

type EditToDoDTO = {
  id: ToDoId;
  userId:string;
  title: string;
  textContent: string;
  highlightFlag: boolean,
  progessStatus: string,
};

type EditToDo = ApplicationService<EditToDoDTO, string>;

const makeEditToDo = eventProvider<Dependencies, EditToDo>(
  ({ todoRepository }, enqueue) =>
    async (payload: EditToDoDTO) => {

      const todoItem = ToDo.editToDo({
        id: payload.id,
        userId: payload.userId,
        title: payload.title,
        textContent: payload.textContent,
        highlightFlag:payload.highlightFlag,
        progessStatus: payload.progessStatus,
      });

      await todoRepository.store(todoItem);

      enqueue(ToDoEditedEvent.createEvent(todoItem));

      return payload.id.value;
    }
);

export { makeEditToDo };
export type { EditToDo };
