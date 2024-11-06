'use client';

import { HeaderCell } from '../../../app/shared/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Avatar, Button } from 'rizzui';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@ui/date-cell';
import React, { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { formatMillier, formatTel, getInitials } from '@/lib/utils';

import { ArrowRight, Eye, Pencil, Trash2 } from 'lucide-react';
import { FactureItemService } from '@/lib/definitions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

type Columns = {
  data: any[];
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
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHistoryItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Intitulé" />,
    dataIndex: 'intitule',
    key: 'intitule',
    width: 400,
    render: (intitule: string, row: any) => (
      <>
        <Text>{intitule}</Text>
      </>
    ),
  },
  {
    title: <HeaderCell title="Charge" />,
    dataIndex: 'charge_id',
    key: 'charge_id',
    width: 400,
    render: (charge_id: number, row: any) => (
      <>
        <Text>{row.charge?.nom_charge}</Text>
      </>
    ),
  },
  {
    title: <HeaderCell title="Règlement" />,
    dataIndex: 'date_reglement',
    key: 'date_reglement',
    width: 90,
    render: (date_reglement: Date) => <DateCell date={date_reglement} withTime={false} />,
  },
  {
    title: <HeaderCell title="Facturation" />,
    dataIndex: 'date_facturation',
    key: 'date_facturation',
    width: 90,
    render: (date_facturation: Date) => <DateCell date={date_facturation} withTime={false} />,
  },
  {
    title: <HeaderCell title="Fournisseur" className="uppercase" />,
    dataIndex: 'fournisseur.id',
    key: 'fournisseur.id',
    width: 400,
    render: (key: string, row: any) => (
      <>
        <div className="flex items-center gap-x-4">
          <Avatar
            name={row.fournisseur?.nom_fournisseur || 'Fournisseur anonyme'}
            initials={ getInitials(row.fournisseur?.nom_fournisseur || 'Fournisseur anonyme') }
            color="primary"
          />
          <div className="">
            <Text className="text-md font-semibold text-gray-900 dark:text-gray-700">
              {row.fournisseur?.nom_fournisseur || 'Fournisseur anonyme'}
            </Text>
            <Text className="text-[12px] text-gray-600 dark:text-gray-700 capitalize">
              {row.fournisseur?.tel_fournisseur || 'Pas de téléphone'}
            </Text>
          </div>
        </div>
      </>
    ),
  },
  {
    title: <HeaderCell title="Montant" />,
    dataIndex: 'montant',
    key: 'montant',
    width: 200,
    render: (montant: number, row: any) => (
      <div className="flex flex-col">
        <Text className="font-semibold">{ formatMillier(montant) } </Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Reste" />,
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (status: string, row: any) => (
      <>
          { status === 'Payé' && (
            <Badge color="success">{ status }</Badge>
          )}
          
          { status !== 'Payé' && (
            <Badge color="warning">{ formatMillier(row.montant - (row.partial_amount || 0)) }</Badge>
          )}
        </>
    ),
  },
  {
    title: (
      <HeaderCell title="Actions" className="flex justify-center" />
    ),
    dataIndex: 'client_id',
    key: 'client_id',
    width: 480,
    render: (client_id: number, row: any) => {
      return (
        <div className="flex justify-end gap-x-2">
          <Button variant="flat" size="sm" rounded="pill" onClick={() => onHistoryItem(row.id)}>
            Voir historique
          </Button>

          {/* <Tooltip size="sm" placement="top" content={"Afficher les détails"} color="invert">
            <Button size="sm" rounded="pill" color="secondary"><Pencil size={16}/></Button>
          </Tooltip> */}

          <AlertDialog>
            <AlertDialogTrigger>
              <Tooltip size="sm" placement="top" content={"Supprimer"} color="invert">
                <Button size="sm" rounded="pill" color="danger"><Trash2 size={16}/></Button>
              </Tooltip>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Voulez-vous supprimer cet élément?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action une fois validée sera irréversible et les données associées seront supprimées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {onDeleteItem(row.id)}} className="hover:text-primary">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
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
