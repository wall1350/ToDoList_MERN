import { DeleteToDo, makeDeleteToDo } from '@/todo/application/useCases/DeleteToDo';
import { CreateToDo, makeCreateToDo } from '@/todo/application/useCases/CreateToDo';
import { Publisher } from '@/_lib/events/Publisher';
import { makeTestControls, TestControls } from '@/__tests__/TestControls';

describe('DeleteToDo', () => {
  
  const userId = 'mock-todo-userId';
  const title = 'Title';
  const textContent = 'Some content';

  // let todoRepository: ToDoRepository;
  let controls: TestControls;
  const publisher: Publisher = {
    publish: jest.fn(),
  };

  let createToDo: CreateToDo;
  let deleteToDo: DeleteToDo;

  beforeAll(async () => {
    controls = await makeTestControls();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    const { clearDatabase } = controls;
    await clearDatabase();
    const {registry: { todoRepository },} = controls;
    createToDo = makeCreateToDo({todoRepository, eventEmitterPubSub: publisher });
    deleteToDo = makeDeleteToDo({todoRepository, eventEmitterPubSub: publisher });
  });

  afterAll(async () => {
    const { cleanUp } = controls;
    await cleanUp();
  });

  it('should return the deleteResult after execute deleteTodo', async () => {    
    let createResult = await createToDo({ userId, title, textContent });
    expect(createResult).not.toHaveLength(0);
    jest.setTimeout(3000);

    const deleteResult = await deleteToDo({ "todoId":createResult });
    expect(deleteResult).toBe("Delete Success");
  });

});
