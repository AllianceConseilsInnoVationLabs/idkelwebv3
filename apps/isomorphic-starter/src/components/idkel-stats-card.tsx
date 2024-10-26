import React from 'react';
import cn from '@utils/class-names';
import IdkelMetricCard from './cards/idkel/metric';
import { IStatIdkelProps } from '@/lib/ui-definitions';

const IdkelStatsCard = ({ 
    className = '', 
    stats
} : { 
    className?: string, 
    stats: IStatIdkelProps[] 
}) => {
    return (
        <div className={cn('flex gap-5 3xl:gap-8 4xl:gap-9', className)}>
            {stats.map((stat: IStatIdkelProps) => (
                <IdkelMetricCard
                    key={stat.title + stat.id}
                    title={stat.title}
                    metric={stat.metric}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    );
};

export default IdkelStatsCard;
        