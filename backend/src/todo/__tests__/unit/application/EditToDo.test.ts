import { EditToDo, makeEditToDo } from '@/todo/application/useCases/EditToDo';
import { CreateToDo, makeCreateToDo } from '@/todo/application/useCases/CreateToDo';
import { Publisher } from '@/_lib/events/Publisher';
import { makeTestControls, TestControls } from '@/__tests__/TestControls';
import { ToDoIdProvider } from '@/_sharedKernel/infrastructure/ToDoIdProvider';
import { ToDoRepository } from '@/todo/domain/ToDoRepository';

describe('EditToDo', () => {

  const userId = 'mock-todo-userId';
  const title = 'Title';
  const textContent = 'Some content';

  let controls: TestControls;
  const publisher: Publisher = {
    publish: jest.fn(),
  };

  let createToDo: CreateToDo;
  let editTodo: EditToDo;
  let todoRepository: ToDoRepository;

  beforeAll(async () => {
    controls = await makeTestControls();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    const { clearDatabase } = controls;
    await clearDatabase();
    const {registry: { todoRepository:repositoryFromInject },} = controls;
    todoRepository = repositoryFromInject;
    createToDo = makeCreateToDo({todoRepository, eventEmitterPubSub: publisher });
    editTodo = makeEditToDo({todoRepository, eventEmitterPubSub: publisher });
  });

  afterAll(async () => {
    const { cleanUp } = controls;
    await cleanUp();
  });

  it('should return the editResult after execute editToDo', async () => {
    let toDoIdStr = await createToDo({ userId, title, textContent });
    expect(toDoIdStr).not.toHaveLength(0);

    let targetToDoId = ToDoIdProvider.create(toDoIdStr);
    jest.setTimeout(3000);

    const editResult = await editTodo({id:targetToDoId , userId:"editedUserId",
    title:"editedTitle",textContent:"editedTitle",highlightFlag:true,progessStatus:"Finished" });
    expect(editResult).toBe(targetToDoId.value);
  });

  it('should store the editedToDo', async () => {
    let toDoIdStr = await createToDo({ userId, title, textContent });
    jest.setTimeout(5000);

    let targetToDoId = ToDoIdProvider.create(toDoIdStr);
    await editTodo({id:targetToDoId , userId:"editedUserId",
     title:"editedTitle",textContent:"editedTitle",highlightFlag:true,progessStatus:"Finished" });
     jest.setTimeout(3000);

    const todoItem = await todoRepository.findById(toDoIdStr);

    expect(todoItem).toEqual(
      expect.objectContaining({
        id:targetToDoId , 
        userId:"editedUserId",
        title:"editedTitle",
        textContent:"editedTitle",
        highlightFlag:true,
        progessStatus:"Finished" 
      })
    );
    
  });

});
