import type { Event } from '../types';

export function groupEventsByPayloadId(events: Event[]): Record<string, Event[]> {
  return events.reduce((acc, event) => {
    const id = event.delivery_id;
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
}