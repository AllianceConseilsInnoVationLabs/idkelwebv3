"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Loader,
    Select,
    type SelectOption,
    Avatar,
    AdvancedRadio,
} from "rizzui";
import { X } from "lucide-react";
import { IModalProps, IHistoryOperationProps } from '@/lib/ui-definitions';
import HistoryOperationsTableWidget from '@/app/shared/controlled-table/idkel/history-operations-table-widget';

import { getColumns } from '../tables/encaissements/historyColumns';
import { historiqueEncaissements } from '@/data/mouvements/encaissements';

const HistoryOperationModal = ({ isOpen, setOpen, title = "Historique des mouvements", accounts, loading, historyData}: IHistoryOperationProps) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="xl">
            <div className="m-auto px-7 pt-6">
                <div className="mb-0 flex items-center justify-between">
                    <Text className="text-lg font-semibold">{title}</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>
            </div>
            <div className={`${loading ? 'flex justify-center h-[100px]' : 'pb-4'}`}>
                {loading && <Loader variant='spinner' size="xl" />}
                
                {!loading && (
                    <>
                        {historyData.length > 0 && (
                            <HistoryOperationsTableWidget 
                                variant="classic"
                                data={historyData}
                                // @ts-ignore
                                getColumns={getColumns}
                                accounts={accounts}
                                enableSearch={false}
                                className="lg:p-0"
                            />
                        )}

                        {historyData.length === 0 && (
                            <div className="flex justify-center items-center h-[100px]">
                                <Text className="text-gray-500">Aucun mouvement trouvé</Text>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
};

export default HistoryOperationModal;