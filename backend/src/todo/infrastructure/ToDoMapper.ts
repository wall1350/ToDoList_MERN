import { ToDo } from '@/todo/domain/ToDo';
import { ToDoSchema } from '@/todo/infrastructure/ToDoCollection';
import { DataMapper } from '@/_lib/DDD';
import { ToDoIdProvider } from '@/_sharedKernel/infrastructure/ToDoIdProvider';
import { from } from 'uuid-mongodb';

const ToDoMapper: DataMapper<ToDo.Type, ToDoSchema> = {
  toData: (entity: ToDo.Type) => ({
    _id: from(entity.id.value),
    userId: entity.userId,
    title: entity.title,
    textContent: entity.textContent,
    highlightFlag: entity.highlightFlag,
    progessStatus: entity.progessStatus,
  }),

  toEntity: (data: ToDoSchema) => ({
    id: ToDoIdProvider.create(from(data._id).toString()),
    userId: data.userId,
    title: data.title,
    textContent: data.textContent,
    highlightFlag: data.highlightFlag,
    progessStatus: data.progessStatus,
  }),
};

export { ToDoMapper };
