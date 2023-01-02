import { asFunction } from 'awilix';
import { CreateToDo, makeCreateToDo } from '@/todo/application/useCases/CreateToDo';
import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { ToDoCollection, initToDoCollection } from '@/todo/infrastructure/ToDoCollection';
import { makeMongoToDoRepository } from '@/todo/infrastructure/MongoToDoRepository';
import { makeToDoController } from '@/todo/interface/http/todoController';
import { GetToDoList } from '@/todo/application/query/GetToDoList';
import { withMongoProvider } from '@/_lib/MongoProvider';
import { toContainerValues } from '@/_lib/di/containerAdapters';
import { makeMongoGetToDoList } from '@/todo/infrastructure/MakeMongoGetToDoList';
import { makeModule } from '@/context';
import { DeleteToDo,makeDeleteToDo } from './application/useCases/DeleteToDo';
import { makeMongoGetToDoInfo } from './infrastructure/MakeMongoGetToDoInfo';
import { GetToDoInfo } from './application/query/GetToDoInfo';
import { EditToDo, makeEditToDo } from './application/useCases/EditToDo';

const todoModule = makeModule('todo', async ({ container: { register }, initialize }) => {
  const [collections] = await initialize(
    withMongoProvider({
      todoCollection: initToDoCollection,
    })
  );

  register({
    ...toContainerValues(collections),
    todoRepository: asFunction(makeMongoToDoRepository),
    createToDo: asFunction(makeCreateToDo),
    deleteToDo: asFunction(makeDeleteToDo),
    editToDo: asFunction(makeEditToDo),
    getToDoInfo: asFunction(makeMongoGetToDoInfo),
    getToDoList: asFunction(makeMongoGetToDoList),
  });

  await initialize(makeToDoController);
});

type ToDoRegistry = {
  todoCollection: ToDoCollection;
  todoRepository: ToDoRepository;
  createToDo: CreateToDo;
  editToDo: EditToDo;
  deleteToDo: DeleteToDo;
  getToDoInfo: GetToDoInfo;
  getToDoList: GetToDoList;
};

export { todoModule };
export type { ToDoRegistry };
