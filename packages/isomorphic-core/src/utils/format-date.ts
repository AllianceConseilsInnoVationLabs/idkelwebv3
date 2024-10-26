import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';

export function formatDate(
  date?: Date,
  format: string = 'DD MMM, YYYY'
): string {
  if (!date) return '';
  
  dayjs.locale(fr);
  return dayjs(date).format(format);
}
