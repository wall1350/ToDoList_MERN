import { Collection, Db } from 'mongodb';
import { MUUID } from 'uuid-mongodb';

type ToDoSchema = {
  _id: MUUID;
  userId:string;
  title: string;
  textContent: string;
  highlightFlag: boolean;
  progessStatus: string;
};

type ToDoCollection = Collection<ToDoSchema>;

const initToDoCollection = async (db: Db): Promise<ToDoCollection> => {
  const collection: ToDoCollection = db.collection('todo');
  await collection.createIndex({ _id: 1});
  return collection;
};

export { initToDoCollection };
export type { ToDoSchema, ToDoCollection };
