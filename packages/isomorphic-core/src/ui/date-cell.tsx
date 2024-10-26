import cn from '../utils/class-names';
import { formatDate } from '../utils/format-date';

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
  withTime?: boolean;
}

export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'D MMM YYYY',
  timeFormat = 'HH:mm',
  withTime = true,
}: DateCellProps) {
  return (
    <div className={cn('grid gap-0', className)}>
      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('font-medium text-gray-700', dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>

      {withTime && (
        <time
          dateTime={formatDate(date, 'HH:mm:ss')}
          className={cn('text-[13px] text-gray-500', timeClassName)}
        >
          {formatDate(date, timeFormat)}
        </time>
      )}
    </div>
  );
}
