'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PiCaretDoubleUpDuotone, PiDownloadSimpleBold } from 'react-icons/pi';
import WidgetCard from '@components/cards/widget-card';
import SimpleBar from '@ui/simplebar';
import { useMedia } from '@hooks/use-media';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { toCurrency } from '@utils/to-currency';
import { Title, Button, Select, Tooltip as TooltipUI } from 'rizzui';
import { formatMillier } from '@/lib/utils';
import { useState } from 'react';
import { X } from 'lucide-react';

type DataType = {
  name: string;
  Valeur: number;
};

const data: DataType[] = [
  {
    name: 'Jan',
    Valeur: 682,
  },
  {
    name: 'Fév',
    Valeur: 690,
  },
  {
    name: 'Mars',
    Valeur: 910,
  },
  {
    name: 'Avr',
    Valeur: 656,
  },
  {
    name: 'Mai',
    Valeur: 804,
  },
  {
    name: 'Juin',
    Valeur: 747,
  },
  {
    name: 'Juil',
    Valeur: 902,
  },
  {
    name: 'Aout',
    Valeur: 820,
  },
  {
    name: 'Sept',
    Valeur: 582,
  },
  {
    name: 'Oct',
    Valeur: 775,
  },
  {
    name: 'Nov',
    Valeur: 615,
  },
  {
    name: 'Déc',
    Valeur: 973,
  }
];

const selectOptions = [
  { label: '2024', value: 2024 },
  { label: '2023', value: 2023 },
  { label: '2022', value: 2022 }
];

const formatYAxisTick = (value: number): string => {
  if (value >= 1000) {
    return `${value / 1000} M`; // Convert value to thousands (k)
  }

  return value.toString(); // Keep small values as is
};

export default function ProfitChart({ 
  className,
  title = "Evolution de la tresorerie", 
  solde = 7219056,
  theme = 'light',
  progression = data,
  closeable = false,
  periodicable = false,
  closeAction
}: { 
  className?: string, 
  title?: string, 
  solde?: number,
  theme?: 'light' | 'primary',
  progression?: any,
  closeable?: boolean,
  periodicable?: boolean,
  closeAction?: Function
}) {
  const isTablet = useMedia('(max-width: 800px)', false);
  const [value, setValue] = useState(selectOptions[0]);

  return (
    <WidgetCard title="" className={className}>
      <div className="grid grid-cols-10 gap-y-8">
        <div className="col-span-full flex flex-col @2xl:flex-row @2xl:justify-between @4xl:col-span-full @7xl:col-span-2 @7xl:flex-col">
          <div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-sm 2xl:text-base">{ title }</p>
                <Title as="h3" className="mt-1 text-2xl font-semibold">
                  { formatMillier(solde) } 
                </Title>
              </div>
              <div className="flex items-center gap-x-4">
                {periodicable && 
                <Select
                  label="Année"
                  options={selectOptions}
                  value={value}
                  onChange={setValue}
                  className={'flex flex-row items-center gap-x-4 profit-select'}
                />}

                { closeable && closeAction && 
                  <TooltipUI size="sm" placement="top" content={"Fermer"}>
                    <Button
                      className="w-[40px] h-[40px] flex-none rounded-full flex gap-x-4 justify-center bg-primary hover:bg-idkel-purpleaccent p-2 text-white hover:text-idkel"
                      onClick={() => { closeAction() }}
                    >
                      <X width={32} height={32} />
                    </Button>
                  </TooltipUI>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full @3xl:col-span-full @7xl:col-span-8">
          <SimpleBar>
            <div className="h-[400px] w-full @4xl:h-[260px] @7xl:h-[24rem]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                {...(isTablet && { minWidth: '700px' })}
              >
                <AreaChart
                  data={progression}
                  margin={{
                    left: -10,
                    right: 15,
                    bottom: 25,
                  }}
                >
                  <defs>
                    
                      <linearGradient
                        id={`colorGradient${theme}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      > 
                      { theme === 'light' && (
                        <>
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                        </>
                      )}
                      
                      { theme === 'primary' && (
                        <>
                          <stop offset="5%" stopColor="#500d76" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                        </>
                      )}
                      </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="0 0"
                    strokeOpacity={0.435}
                    vertical={false}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    tickMargin={10}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatYAxisTick}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Area
                    strokeWidth={2}
                    type="monotone"
                    dataKey="Valeur"
                    stroke={theme === 'light' ? "#10b981" : "#500d76"}
                    fill={`url(#colorGradient${theme})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SimpleBar>
        </div>
      </div>
    </WidgetCard>
  );
}
