'use client';

import React from 'react';
import StatusField from '../../../app/shared/controlled-table/status-field';
import { Button } from 'rizzui';
import { PiTrashDuotone } from 'react-icons/pi';

const typeOptions = [
  {
    label: 'Devis',
    value: 'devis',
  },
  {
    label: 'Factures',
    value: 'facture',
  },
  
];

const statusOptions = [
  {
    label: 'Tous',
    value: 'Tous',
  },
  {
    label: 'Non payé',
    value: 'Non payé',
  },
  {
    label: 'Payé',
    value: 'Payé',
  },
  {
    label: 'En cours',
    value: 'En cours',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  setTitle?: (title: string) => void;
};
export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
  setTitle,
}: FilterElementProps) {
  

  return (
    <div className="flex w-full items-center gap-3 @[29rem]:flex-row @[42rem]:w-auto @[57rem]:-ms-4">
      <div className="flex w-full gap-3 @[22rem]:flex-row @[42rem]:w-auto">
        {/* <StatusField
          placeholder="Devis ou factures"
          dropdownClassName="!z-10 h-auto"
          className="w-full min-w-[200px] @[42rem]:w-auto bg-white"
          options={typeOptions}
          value={filters['etat']}
          onChange={(value: string) => {
            updateFilter('etat', value);
            
            if(setTitle)
              setTitle(value === "devis" ? "Devis" : "Factures");
          }}
          getOptionValue={(option: { value: any }) => option.value}
          displayValue={(selected: string) =>
            typeOptions.find((option) => option.value.toLowerCase() === selected.toLowerCase())
              ?.label ?? ''
          }
          placement="bottom-start"
        /> */}
        
        
        
        {/* <StatusField
          placeholder="Statut"
          dropdownClassName="!z-10 h-auto"
          className="w-full min-w-[145px] @[42rem]:w-auto bg-white"
          options={statusOptions}
          value={filters['status']}
          onChange={(value: string) => {
            updateFilter('status', value);
          }}
          getOptionValue={(option) => option.label}
        /> */}
      </div>
      
      {/* {isFiltered ? (
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
      ) : null} */}
    </div>
  );
}
