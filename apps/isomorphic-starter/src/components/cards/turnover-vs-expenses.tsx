'use client';

import { Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/widget-card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomTooltip } from '@components/charts/custom-tooltip';

const data = [
  {
    day: 'Jan',
    ca: 2,
    charges: 13,
  },
  {
    day: 'Fév',
    ca: 27,
    charges: 39,
  },
  {
    day: 'Mar',
    ca: 21,
    charges: 32,
  },
  {
    day: 'Avr',
    ca: 45,
    charges: 25,
  },
  {
    day: 'Mai',
    ca: 36,
    charges: 25,
  },
  {
    day: 'Juin',
    ca: 50,
    charges: 31,
  },
  {
    day: 'Juil',
    ca: 2,
    charges: 13,
  },
  {
    day: 'Aout',
    ca: 27,
    charges: 39,
  },
  {
    day: 'Sept',
    ca: 21,
    charges: 32,
  },
  {
    day: 'Oct',
    ca: 45,
    charges: 25,
  },
  {
    day: 'Nov',
    ca: 36,
    charges: 25,
  },
  {
    day: 'Déc',
    ca: 50,
    charges: 31,
  },
];

export default function TurnoverVsExpenses({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title={'Chiffre d\'affaires vs Charges'}
      description={'Comparatif du CA et des charges sur la période'}
      rounded="lg"
      descriptionClassName="text-gray-500 mt-1.5"
      className={cn('grid grid-cols-1', className)}
    >
      <div className="h-72 w-full @sm:pt-3 @lg:pt-4 @xl:pt-5 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: -30,
            }}
          >
            <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
            <XAxis dataKey="day" tickLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="natural"
              dataKey="ca"
              stroke="#5451FD"
              fill="#5451FD"
              strokeWidth={2.3}
              fillOpacity={0.05}
            />
            <Area
              type="natural"
              dataKey="charges"
              stroke="#00EEFD"
              fill="#00EEFD"
              strokeWidth={2.3}
              fillOpacity={0.05}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
