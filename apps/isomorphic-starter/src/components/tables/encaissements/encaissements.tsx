'use client';

import WidgetCard from '@components/cards/widget-card';
import React, { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@hooks/use-column';
import { useTable } from '@hooks/use-table';
import ControlledTable from '../../../app/shared/controlled-table/index';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import { encaissements } from '@/data/mouvements/encaissements';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import DatePicker from '@/components/datepicker';

import { EncaissementHistoryItem, Facture } from '@/lib/definitions';
import Link from 'next/link';
import { routes } from '@/config/routes-idkel';
import { deleteOperation, getOperationHistory } from '@/actions/operations';
import { useToast } from '@/hooks/use-toast';
import { set } from 'lodash';

const filterState = {
  date: [null, null],
  status: '',
  etat: 'devis',
};

interface EncaissementsProps { 
  className?: string, 
  datas: Facture[], 
  openHistory: boolean,
  isHistoryLoading: boolean,

  setNewOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenHistory: React.Dispatch<React.SetStateAction<boolean>>,
  setHistoryData: React.Dispatch<React.SetStateAction<EncaissementHistoryItem[]>>,
  setIsHistoryLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshData: () => void,
}

export default function Encaissements({ className, datas, setNewOpen, refreshData, setOpenHistory, isHistoryLoading, setIsHistoryLoading, setHistoryData}: EncaissementsProps) {
  const [pageSize, setPageSize] = useState(7);
  const { toast } = useToast();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(async (id: string) => {
    handleDelete(id);
    const deletion = await deleteOperation(Number(id));
    
    if (deletion.success) {
      refreshData();

      toast({
        title: "Opération effectuée",
        description: "Encaissement supprimé avec succès",
        className: "bg-green-500 text-white",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHistoryItem = useCallback(async (id: string) => {
    setOpenHistory(true); // On ouvre la modal des historiques
    setIsHistoryLoading(true); // On affiche le loader
    const historyDatas = await getOperationHistory(Number(id)); // On récupère les historiques de l'opération
    setHistoryData(historyDatas);  // On met à jour les historiques
    setIsHistoryLoading(false); // On cache le loader
  }, [setHistoryData, setIsHistoryLoading, setOpenHistory]);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(datas, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: datas,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onHistoryItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);
  const [title, setTitle] = useState('Devis');
  const [startRangeDate, setStartRangeDate] = React.useState<Date | null>(null);
  const [endRangeDate, setEndRangeDate] = React.useState<Date | null>(null);
  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartRangeDate(start);
    setEndRangeDate(end);
  };

  return (
    <WidgetCard
      className={className}
      headerClassName="mb-6 items-center gap-x-8 @[57rem]:flex-row @[57rem]:items-center justify-between"
      actionClassName="@[57rem]:ps-11 ps-0 flex items-center justify-end w-[80%] @[42rem]:w-full @[57rem]:w-auto "
      title={'Liste'}
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className="flex w-2/3 items-center justify-between gap-3 gap-x-8 @[42rem]:flex-row @[57rem]:mt-0">
          {/* <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
            setTitle={setTitle}
          />
          <div className="">
            <DatePicker
              className="min-w-[300px] bg-white"
              selected={startRangeDate}
              onChange={handleRangeChange}
              startDate={startRangeDate}
              endDate={endRangeDate}
              monthsShown={2}
              placeholderText="Selectionner une plage de date"
              selectsRange
              inputProps={{
                clearable: true,
                onClear: () => {
                  setStartRangeDate(null);
                  setEndRangeDate(null);
                },
              }}
            />
          </div> */}
          <Input
            className="w-full @[42rem]:w-auto @[70rem]:w-80 bg-white"
            type="search"
            placeholder="Rechercher"
            inputClassName="h-10"
            value={searchTerm}
            onClear={() => handleSearch('')}
            onChange={(event) => handleSearch(event.target.value)}
            clearable
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
          
          <Button className="w-[300px] @[42rem]:w-[200px] h-[40px]" onClick={() => setNewOpen(true)}>
            Nouveau
          </Button>
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        className="-mx-5 lg:-mx-7"
        scroll={{ x: 1000 }}
      />
    </WidgetCard>
  );
}
