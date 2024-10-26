import React from 'react';
import { IStatIdkelProps } from '@/lib/ui-definitions';
import { formatMillier } from '@/lib/utils';

const IdkelMetricCard = ({
    icon,
    title,
    metric,
    color,
} : IStatIdkelProps) => {
    return (
        <div className="bg-idkel-gray h-auto w-1/3 p-4 flex flex-col rounded-2xl">
            <div className={` ${color ? color : 'bg-idkel-purpleaccent'}  p-4 w-[60px] h-[60px] flex-none rounded-xl`}>
                {icon}
            </div>
            <p className="font-light text-black mt-4">{title}</p>
            <h3 className="text-[20px] font-normal">{ formatMillier(metric) } F</h3>
        </div>
    );
}

export default IdkelMetricCard;