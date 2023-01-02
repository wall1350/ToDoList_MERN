import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace ToDoDeletedEvent {
  export const topic = 'ToDo' as const;
  export const eventType = 'ToDoDeletedEvent' as const;

  type ToDoDeletedEvent = Event<string, typeof eventType, typeof topic>;

  export const createEvent = (todoId: string): ToDoDeletedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: todoId,
  });

  export type Type = ToDoDeletedEvent;
}

export { ToDoDeletedEvent};