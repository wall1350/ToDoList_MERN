import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { ToDoId } from '@/_sharedKernel/domain/ToDoId';


namespace ToDo {
  type ToDo = AggregateRoot<ToDoId> &
    Readonly<{
      userId: string;
      title: string;
      textContent: string;
      highlightFlag: boolean;
      progessStatus: string;
    }>;

  const withInvariants = makeWithInvariants<ToDo>((self, assert) => {
    assert(self.title?.length > 0);
    assert(self.textContent?.length >= 0);
  });

  type ToDoProps = Readonly<{
    id: ToDoId;
    userId:string;
    title: string;
    textContent: string;
  }>;

  type EditToDoProps = Readonly<{
    id: ToDoId;
    userId:string;
    title: string;
    textContent: string;
    highlightFlag: boolean,
    progessStatus: string,
  }>;

  export const createToDo = withInvariants(
    (props: ToDoProps): ToDo => ({
      id: props.id,
      userId: props.userId,
      title: props.title,
      textContent: props.textContent,
      highlightFlag:false,
      progessStatus: 'HAVE_NOT_STARTED',
    })
  );

  export const editToDo = withInvariants(
    (props: EditToDoProps): ToDo => ({
      id: props.id,
      userId: props.userId,
      title: props.title,
      textContent: props.textContent,
      highlightFlag:props.highlightFlag,
      progessStatus: props.progessStatus,
    })
  );

  // export const helightToDo = withInvariants(
  //   (self: ToDo): ToDo => ({
  //     ...self,
  //     highlightFlag: true,
  //   })
  // );

  // export const unhelightToDo = withInvariants(
  //   (self: ToDo): ToDo => ({
  //     ...self,
  //     highlightFlag: false,
  //   })
  // );

  // export const changeToDoTitle = withInvariants(
  //   (self: ToDo, newTitle: string): ToDo => ({
  //     ...self,
  //     title: newTitle,
  //   })
  // );

  // export const changeToDoTextContent = withInvariants(
  //   (self: ToDo, newTextContent: string): ToDo => ({
  //     ...self,
  //     textContent: newTextContent,
  //   })
  // );

  // export const editToDoProgress = withInvariants(
  //   (self: ToDo, newTextContent: string): ToDo => ({
  //     ...self,
  //     textContent: newTextContent,
  //   })
  // );

  export type Type = ToDo;
}

export { ToDo };
