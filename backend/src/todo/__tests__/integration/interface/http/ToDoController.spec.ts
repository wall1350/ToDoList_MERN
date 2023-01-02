import { makeTestControls, TestControls } from '@/__tests__/TestControls';

describe('TodoController', () => {
  let controls: TestControls;

  beforeAll(async () => {
    controls = await makeTestControls();
  });

  beforeEach(async () => {
    const { clearDatabase } = controls;

    await clearDatabase();
  });

  afterAll(async () => {
    const { cleanUp } = controls;

    await cleanUp();
  });

  describe('POST /api/todos', () => {
    it('should create a new ToDo', async () => {
      const {
        request,
        registry: { todoRepository },
      } = controls;

      const userId = "mockUserId";
      const title = 'mockTitle';
      const textContent = 'mockTextContent';

      return request()
        .post('/api/todos')
        .send({
          userId,
          title,
          textContent,
        })
        .expect(async (res) => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty('id');
          const todoItem = await todoRepository.findById(res.body.id);

          expect(todoItem).toEqual(
            expect.objectContaining({
              userId,
              title,
              textContent,
            })
          );
        });
    });
  });
});
