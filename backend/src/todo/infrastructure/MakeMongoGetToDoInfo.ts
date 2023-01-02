import { ToDoCollection, ToDoSchema } from '@/todo/infrastructure/ToDoCollection';
import MUUID from 'uuid-mongodb';
import { Filter } from 'mongodb';
import { GetToDoInfo } from '../application/query/GetToDoInfo';

type Dependencies = {
  todoCollection: ToDoCollection;
};

const makeMongoGetToDoInfo =
  ({ todoCollection }: Dependencies): GetToDoInfo =>
  async ({ filter}) => {

    let match: Filter<ToDoSchema> = {};
    
    if (filter.id) {
      match = {
        ...match,
        _id: {
          $eq: MUUID.from(filter.id)
        },
      };
    }

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

export { makeMongoGetToDoInfo };
