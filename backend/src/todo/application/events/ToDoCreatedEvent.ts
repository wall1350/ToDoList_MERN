import { ToDo } from '@/todo/domain/ToDo';
import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace ToDoCreatedEvent {
  export const topic = 'ToDo' as const;
  export const eventType = 'ToDoCreatedEvent' as const;

  type ToDoCreatedEvent = Event<ToDo.Type, typeof eventType, typeof topic>;

  export const createEvent = (todo: ToDo.Type): ToDoCreatedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: todo,
  });

  export type Type = ToDoCreatedEvent;
}

export { ToDoCreatedEvent};