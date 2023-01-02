import { ToDo } from '@/todo/domain/ToDo';
import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace ToDoEditedEvent {
  export const topic = 'ToDo' as const;
  export const eventType = 'ToDoEditedEvent' as const;

  type ToDoEditedEvent = Event<ToDo.Type, typeof eventType, typeof topic>;

  export const createEvent = (editPayload: ToDo.Type): ToDoEditedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: editPayload,
  });

  export type Type = ToDoEditedEvent;
}

export { ToDoEditedEvent};