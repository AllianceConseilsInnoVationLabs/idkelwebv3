'use client';

import { HeaderCell } from '../../../app/shared/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Avatar, Button } from 'rizzui';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@ui/date-cell';
import React, { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { formatMillier } from '@/lib/utils';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

type Columns = {
  data: any[];
  accounts: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHistoryItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  accounts,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHistoryItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Compte" />,
    dataIndex: 'compte_id',
    key: 'compte_id',
    width: 70,
    render: (compte_id: string, row: any) => (
      <>
        <Text className="font-bold">{accounts.find(a => a.id === compte_id).nom_compte}</Text>
        <Text className="text-[11px]">{accounts.find(a => a.id === compte_id).compte_type}</Text>
      </>
    ),
  },
  {
    title: <HeaderCell title="Libellé" />,
    dataIndex: 'libelle',
    key: 'libelle',
    width: 100,
    render: (libelle: string, row: any) => (
      <>
        <Text>{libelle}</Text>
      </>
    ),
  },
  {
    title: <HeaderCell title="Date" />,
    dataIndex: 'date',
    key: 'date',
    width: 50,
    render: (date: Date) => <DateCell date={date} withTime={false} />,
  },
  {
    title: <HeaderCell title="Montant" />,
    dataIndex: 'montant',
    key: 'montant',
    width: 50,
    render: (montant: number, row: any) => (
      <div className="flex flex-col">
        <Text className="font-semibold">{ formatMillier(parseInt(String(montant))) } </Text>
        <Text className="text-[11px]">Solde après : {formatMillier(parseInt(String(row.nouveau_solde_compte)))}</Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Reste" />,
    dataIndex: 'reste_a_payer',
    key: 'reste_a_payer',
    width: 50,
    render: (reste_a_payer: string, row: any) => (
      <>
          { parseInt(row.reste_a_payer) === 0 && (
            <Badge color="success">{ "Payé" }</Badge>
          )}
          
          { parseInt(row.reste_a_payer) > 0 && (
            <Badge color="warning">{ formatMillier(Number(row.reste_a_payer)) }</Badge>
          )}
        </>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10 h-auto"
      className="min-w-[140px]"
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Closed':
      return (
        <div className="flex items-center">
          <PiPlusCircle className="shrink-0 rotate-45 fill-red-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}
