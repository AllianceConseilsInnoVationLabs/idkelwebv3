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
    reel: 2,
    previsionnel: 13,
  },
  {
    day: 'Fév',
    reel: 27,
    previsionnel: 39,
  },
  {
    day: 'Mar',
    reel: 21,
    previsionnel: 32,
  },
  {
    day: 'Avr',
    reel: 45,
    previsionnel: 25,
  },
  {
    day: 'Mai',
    reel: 36,
    previsionnel: 25,
  },
  {
    day: 'Juin',
    reel: 50,
    previsionnel: 31,
  },
  {
    day: 'Juil',
    reel: 2,
    previsionnel: 13,
  },
  {
    day: 'Aout',
    reel: 27,
    previsionnel: 39,
  },
  {
    day: 'Sept',
    reel: 21,
    previsionnel: 32,
  },
  {
    day: 'Oct',
    reel: 45,
    previsionnel: 25,
  },
  {
    day: 'Nov',
    reel: 36,
    previsionnel: 25,
  },
  {
    day: 'Déc',
    reel: 50,
    previsionnel: 31,
  },
];

export default function RealTurnoverVsPrev({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title={'Chiffre d\'affaires réel vs Prévisionnel'}
      description={'Comparatif du CA réel et celui attendu sur la période'}
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
              dataKey="reel"
              stroke="#5451FD"
              fill="#5451FD"
              strokeWidth={2.3}
              fillOpacity={0.05}
            />
            <Area
              type="natural"
              dataKey="previsionnel"
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
