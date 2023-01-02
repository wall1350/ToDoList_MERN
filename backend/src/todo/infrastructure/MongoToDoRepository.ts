import { ToDo } from '@/todo/domain/ToDo';
import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { ToDoCollection } from '@/todo/infrastructure/ToDoCollection';
import { ToDoMapper } from '@/todo/infrastructure/ToDoMapper';
import { NotFoundError } from '@/_lib/errors/NotFoundError';
import { ToDoId } from '@/_sharedKernel/domain/ToDoId';
import { ToDoIdProvider } from '@/_sharedKernel/infrastructure/ToDoIdProvider';
import { from, v4 } from 'uuid-mongodb';

type Dependencies = {
  todoCollection: ToDoCollection;
};

const makeMongoToDoRepository = ({ todoCollection }: Dependencies): ToDoRepository => ({
  async getNextId(): Promise<ToDoId> {
    return Promise.resolve(ToDoIdProvider.create(v4().toString()));
  },
  async findById(id: string): Promise<ToDo.Type> {
    const todoItem = await todoCollection.findOne({ _id: from(id)});

    if (!todoItem) {
      throw NotFoundError.create();
    }

    return ToDoMapper.toEntity(todoItem);
  },
  async deleteById(id: string): Promise<string> {
    const todoItem = await todoCollection.findOne({ _id: from(id)});

    if (!todoItem) {
      throw NotFoundError.create();
    }
    const result = await todoCollection.deleteOne({ _id: from(id)});
    if(result.acknowledged)
      return "Delete Success";

    return "Delete Failed";
  },
  async store(entity: ToDo.Type): Promise<void> {
    const { _id, ...data } = ToDoMapper.toData(entity);

    const count = await todoCollection.countDocuments({ _id });

    if (count) {
      await todoCollection.updateOne(
        { _id},
        {
          $set: {
            ...data,
          },
        }
      );

      return;
    }

    await todoCollection.insertOne({
      _id,
      ...data,
    });
  },
});

export { makeMongoToDoRepository };
