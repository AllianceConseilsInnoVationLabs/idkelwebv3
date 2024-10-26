'use client';

import React from 'react';
import StatusField from '../../../app/shared/controlled-table/status-field';
import { Button } from 'rizzui';
import { PiTrashDuotone } from 'react-icons/pi';

const typeOptions = [
  {
    label: 'Tous',
    value: 'tous',
  },
  {
    label: 'Envoi',
    value: 'envoi',
  },
  {
    label: 'Paiement',
    value: 'paiement', 
  },
  {
    label: 'Recharge',
    value: 'recharge', 
  }
];

const statusOptions = [
  {
    label: 'Effectué',
    value: 'Effectué',
  },
  {
    label: 'En attente',
    value: 'En attente',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};
export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  return (
    <div className="flex w-full items-center gap-3 @[29rem]:flex-row @[42rem]:w-auto @[57rem]:-ms-4">
      <div className="flex w-full gap-3 @[22rem]:flex-row @[42rem]:w-auto">
        <StatusField
          placeholder="Type"
          dropdownClassName="!z-10 h-auto"
          className="w-full min-w-[158px] @[42rem]:w-auto bg-white"
          options={typeOptions}
          value={filters['type']}
          onChange={(value: string) => {
            updateFilter('type', value);
          }}
          getOptionValue={(option: { value: any }) => option.value}
          displayValue={(selected: string) =>
            typeOptions.find((option) => option.label.toLowerCase() === selected.toLowerCase())
              ?.label ?? ''
          }
          placement="bottom-start"
        />
        <StatusField
          placeholder="Statut"
          dropdownClassName="!z-10 h-auto"
          className="w-full min-w-[145px] @[42rem]:w-auto bg-white"
          options={statusOptions}
          value={filters['statut']}
          onChange={(value: string) => {
            updateFilter('statut', value);
          }}
          getOptionValue={(option) => option.label}
        />
      </div>
      
      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Effacer
        </Button>
      ) : null}
    </div>
  );
}
