import { ToDoCollection, ToDoSchema } from '@/todo/infrastructure/ToDoCollection';
import MUUID from 'uuid-mongodb';
import { GetToDoList } from '@/todo/application/query/GetToDoList';
import { Filter } from 'mongodb';

type Dependencies = {
  todoCollection: ToDoCollection;
};

const makeMongoGetToDoList =
  ({ todoCollection }: Dependencies): GetToDoList =>
  async () => {
    const match: Filter<ToDoSchema> = {};

    const todos = await todoCollection
      .aggregate([
        {
          $match: match,
        },
      ])
      .toArray<ToDoSchema>();

    return {
      data: todos.map((todo) => ({
        id: MUUID.from(todo._id).toString(),
        userId:todo.userId,
        title: todo.title,
        textContent: todo.textContent,
        highlightFlag: todo.highlightFlag,
        progessStatus: todo.progessStatus,
      })),
    };
  };

export { makeMongoGetToDoList };
