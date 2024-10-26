'use client';

import { HeaderCell } from '../../../app/shared/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Avatar, Button, Loader } from 'rizzui';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@ui/date-cell';
import React, { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { formatMillier, formatTel, getInitials } from '@/lib/utils';
import { deleteDevis } from '@/actions/devis';

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


import { ArrowRight, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  
  // {
  //   title: (
  //     <div className="ps-3.5">
  //       <Checkbox
  //         title={'Select All'}
  //         onChange={handleSelectAll}
  //         checked={checkedItems.length === data.length}
  //         className="cursor-pointer"
  //       />
  //     </div>
  //   ),
  //   dataIndex: 'checked',
  //   key: 'checked',
  //   width: 30,
  //   render: (_: any, row: any) => (
  //     <div className="inline-flex ps-3.5">
  //       <Checkbox
  //         aria-label={'ID'}
  //         className="cursor-pointer"
  //         checked={checkedItems.includes(row.id)}
  //         {...(onChecked && { onChange: () => onChecked(row.id) })}
  //       />
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="NUMÉRO" />,
    dataIndex: 'numero_facture',
    key: 'numero_facture',
    width: 90,
    render: (numero_facture: string, row: any) => (
      <>
        <Text>#{numero_facture}</Text>
      </>
    ),
  },
  {
    title: <HeaderCell title="Client" className="uppercase" />,
    dataIndex: 'customer.id',
    key: 'customer.id',
    width: 400,
    render: (key: string, row: any) => (
      <>

        <div className="flex items-center gap-x-4">
          <Avatar
            name={ row.customer?.nom_client || 'Client anonyme' }
            initials={ getInitials(row.customer?.nom_client || 'Client anonyme') }
            color="primary"
          />
          <div className="">
            <Text className="text-md font-semibold text-gray-900 dark:text-gray-700">
              {row.customer?.nom_client || 'Client anonyme'}
            </Text>
            <Text className="text-[12px] text-gray-600 dark:text-gray-700 capitalize">
              {row.customer?.tel_client || 'Pas de téléphone'}
            </Text>
          </div>
        </div>
      </>
    ),
  },
  {
    title: <HeaderCell title="Montant" className="uppercase" />,
    dataIndex: 'montant',
    key: 'montant',
    width: 450,
    render: (montant: number, row: any) => (
      <div className="flex flex-col">
        <Text className="font-semibold">{ formatMillier(montant) } </Text>
        <Text className="font-semibold -mt-[5px] text-[10px] text-gray-600 dark:text-gray-700">Payé : { formatMillier(row.mouvement?.partial_amount || 0) } </Text>
        <Text className="font-semibold -mt-[5px] text-[10px] text-gray-600 dark:text-gray-700">
          Reste à payer :  &nbsp;
          { formatMillier(row.mouvement ? montant - row.mouvement?.partial_amount : montant) } 
        </Text>
        <Text className="font-semibold -mt-[5px] text-[10px] text-gray-600 dark:text-gray-700">TVA : { formatMillier(row.tva) } </Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Mode de paiement" className="uppercase" />,
    dataIndex: 'mode_paiement',
    key: 'mode_paiement',
    width: 200,
    render: (mode_paiement: string, row: any) => (
      <Text>{ mode_paiement === 'Portefeuille Odigo' ? 'Portefeuille Idkel' : mode_paiement }</Text>
    ),
  },
  {
    title: <HeaderCell title="Émission" className="uppercase" />,
    dataIndex: 'date_facture',
    key: 'date_facture',
    width: 230,
    render: (date: Date) => <DateCell date={date} withTime={false} />,
  },

  {
    title: (
      <HeaderCell
        title="Statut"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'statut'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 180,
    render: (status: string) => {
      return (
        <>
          { status === 'Payé' && (
            <Badge color="success">{ status }</Badge>
          )}
          
          { status === 'Non payé' && (
            <Badge color="danger">{ status }</Badge>
          )}
          
          { status === 'En cours' && (
            <Badge color="warning">{ status }</Badge>
          )}
        </>
      );
    },
  },
  
  {
    title: (
      <HeaderCell title="Actions" className="flex justify-center" />
    ),
    dataIndex: 'client_id',
    key: 'client_id',
    width: 480,
    render: (client_id: number, row: any) => {
      // const [isDeleting, setIsDeleting] = useState<boolean>(false);

      return (
        <div className="flex justify-end gap-x-2">
          {row.etat ===  "devis" && (
            <Button variant="outline" size="sm" rounded="pill" color="primary">
              Éditer facture
            </Button>
          )}

          <Button variant="flat" size="sm" rounded="pill">
            Encaisser
          </Button>

          <Tooltip size="sm" placement="top" content={"Afficher les détails"} color="invert">
            <Button size="sm" rounded="pill" color="secondary">
              <Link href={'/tresorerie/devis/details/'+row.id}>
                <Eye size={16}/>
              </Link>
            </Button>
          </Tooltip>

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
                <AlertDialogAction onClick={() => {onDeleteItem(row.id)}}>
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
