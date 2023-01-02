import { ToDoCreatedEvent } from '@/todo/application/events/ToDoCreatedEvent';
import { CreateToDo, makeCreateToDo } from '@/todo/application/useCases/CreateToDo';
import { ToDoRepository } from '@/todo/domain/ToDoRepository';
import { Publisher } from '@/_lib/events/Publisher';
import { v4 } from 'uuid-mongodb';

describe('CreateToDo', () => {
  const id = v4().toString();
  const userId = 'mock-todo-userId';
  const title = 'Title';
  const textContent = 'Some content';

  const todoRepository: ToDoRepository = {
    findById: jest.fn(),
    deleteById: jest.fn(),
    store: jest.fn(),
    getNextId: jest.fn().mockReturnValue(Promise.resolve({ value: id })),
  };

  const publisher: Publisher = {
    publish: jest.fn(),
  };

  let createToDo: CreateToDo;

  beforeEach(async () => {
    jest.clearAllMocks();
    createToDo = makeCreateToDo({todoRepository, eventEmitterPubSub: publisher });
  });

  it('should return the created id of todo', async () => {
    const result = await createToDo({ userId,title, textContent });

    expect(result).toBe(id);
  });

  it('should store the todo', async () => {
    await createToDo({ userId, title, textContent });

    expect(todoRepository.store).toHaveBeenCalledWith(
      expect.objectContaining({
        id: { value: id },
        title,
        textContent,
      })
    );
  });

  it('should enqueue ToDoCreatedEvent', async () => {
    await createToDo({ userId, title, textContent });

    expect(publisher.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: ToDoCreatedEvent.eventType,
        topic: ToDoCreatedEvent.topic,
        payload: expect.objectContaining({
          id: { value: id },
          title,
          textContent,
        }),
      })
    );
  });
});
