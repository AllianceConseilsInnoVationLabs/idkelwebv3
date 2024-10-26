'use client';

import cn from '@utils/class-names';
import ExpenseIcon from '@components/icons/expenses';
import SalesIcon from '@components/icons/sales';
import TagIcon from '@components/icons/tag';
import MetricCard from '@components/cards/metric-card';
import TagIcon2 from '@components/icons/tag-2';
import TagIcon3 from '@components/icons/tag-3';
import React from 'react';
import { formatMillier } from '@/lib/utils';
import { IStatCardProps } from '@/lib/ui-definitions';

const ticketStats = [
  {
    id: 1,
    icon: <ExpenseIcon className="h-full w-full" />,
    title: 'Collecté',
    metric: formatMillier(0),
  },
  {
    id: 2,
    icon: <SalesIcon className="h-full w-full" />,
    title: 'Déductible',
    metric: formatMillier(0),
  },
  {
    id: 3,
    icon: <TagIcon2 className="h-full w-full" />,
    title: 'A payer',
    metric: formatMillier(0),
  }
];

export default function StatCards({ className, stats }: { className?: string, stats?: IStatCardProps[] }) {
  return (
    <div
      className={cn('flex gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {stats ? stats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
          className="w-1/4"
        />
      )) : ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
          className="w-1/4"
        />
      ))}
    </div>
  );
}
