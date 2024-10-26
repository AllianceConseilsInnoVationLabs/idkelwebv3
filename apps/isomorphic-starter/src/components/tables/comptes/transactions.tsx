'use client';

import WidgetCard from '@components/cards/widget-card';
import React, { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@hooks/use-column';
import { useTable } from '@hooks/use-table';
import ControlledTable from '../../../app/shared/controlled-table/index';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
// import { jobData } from '../../../data/job-data';
import { transactionData } from '../../../data/comptes/transactions';
import { getColumns } from './columns';
import FilterElement from './filter-element';

import { Transaction } from '@/lib/definitions';

const filterState = {
  date: [null, null],
  status: '',
};
export default function Transactions({ className, datas }: { className?: string, datas: Transaction[] }) {
  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
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

  return (
    <WidgetCard
      className={className}
      headerClassName="mb-6 items-center gap-x-8 @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Transactions"
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className="flex w-full items-center justify-between gap-3 gap-x-8 @[42rem]:flex-row @[57rem]:mt-0">
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
          <Input
            className="w-full @[42rem]:w-auto @[70rem]:w-80 bg-white"
            type="search"
            placeholder="Rechercher"
            inputClassName="h-9"
            value={searchTerm}
            onClear={() => handleSearch('')}
            onChange={(event) => handleSearch(event.target.value)}
            clearable
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
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
      />
    </WidgetCard>
  );
}
