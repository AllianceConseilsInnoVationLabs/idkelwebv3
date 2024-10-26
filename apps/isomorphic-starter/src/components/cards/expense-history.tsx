'use client';

import WidgetCard from '@components/cards/widget-card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { useMedia } from '@hooks/use-media';
import SimpleBar from '@ui/simplebar';
import DropdownAction from '@components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@utils/class-names';
import { formatMillier } from '@/lib/utils';

const data = [
  {
    label: 'Jan',
    amount: 20,
  },
  {
    label: 'Fév',
    amount: 50,
  },
  {
    label: 'Mar',
    amount: 80,
  },
  {
    label: 'Avr',
    amount: 110,
  },
  {
    label: 'Mai',
    amount: 82,
  },
  {
    label: 'Juin',
    amount: 90,
  },
  {
    label: 'Juil',
    amount: 65,
  },
  {
    label: 'Aou',
    amount: 50,
  },
  {
    label: 'Sept',
    amount: 60,
  },
  {
    label: 'Oct',
    amount: 30,
  },
  {
    label: 'Nov',
    amount: 82,
  },
  {
    label: 'Déc',
    amount: 90,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function ExpenseHistory({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Charges"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('min-h-[28rem]', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-semibold">
          { formatMillier(239620) } 
        </Title>
      </div>
      <SimpleBar>
        <div className="h-[27.3rem] w-full pe-1 pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: 2,
                right: 5,
                bottom: 10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="amountCustomer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EE0000" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EE0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={20}
                tickFormatter={(label) => `${label} M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="amount"
                stroke="#EE0000"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
                dot={<CustomizedDot />}
                activeDot={<CustomizedDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomizedDot(props: any) {
  const { cx, cy } = props;
  return (
    <svg
      x={cx - 6}
      y={cy - 9}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="scale-150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        fill="#EE0000"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}
