import { makeIdProvider } from '@/_lib/IdProvider';
import { ToDoId } from '@/_sharedKernel/domain/ToDoId';

const ToDoIdProvider = makeIdProvider<ToDoId>('ToDoId');

export { ToDoIdProvider };
