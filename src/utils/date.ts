import { format } from 'timeago.js';

export default function formatDate(date: string): string {
  return format(date, 'en_US');
}
