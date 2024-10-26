'use client';

import WidgetCard from '@components/cards/widget-card';
import React, { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@hooks/use-column';
import { useTable } from '@hooks/use-table';
import ControlledTable from '../../../app/shared/controlled-table/index';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import { factureData } from '@/data/factures/factures';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import DatePicker from '@/components/datepicker';

import { Facture } from '@/lib/definitions';
import Link from 'next/link';
import { routes } from '@/config/routes-idkel';
import { deleteDevis } from '@/actions/devis';

const filterState = {
  date: [null, null],
  status: '',
  etat: 'devis',
};
export default function Devis({ className, datas, refreshData }: { className?: string, datas: Facture[], refreshData: () => void }) {
  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    deleteDevis(Number(id));
    handleDelete(id);
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      actionClassName="@[57rem]:ps-11 ps-0 items-center w-[80%] @[42rem]:w-full @[57rem]:w-auto "
      title={title}
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className="flex w-fullitems-center justify-between gap-3 gap-x-8 @[42rem]:flex-row @[57rem]:mt-0">
          <FilterElement
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
          </div>
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
          
          <Link href={routes.tresorerie.devis.create} className="w-full">
            <Button className="w-full @[42rem]:w-[200px] h-[37px]">
              Créer un devis
            </Button>
          </Link>
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
