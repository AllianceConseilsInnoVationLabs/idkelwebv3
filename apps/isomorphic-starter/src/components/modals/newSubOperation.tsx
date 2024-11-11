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
import { IModalProps, INewOperationModalProps } from '@/lib/ui-definitions';
import NewSubEncaissement from '@/components/operations/encaissements/sub-operation';
import NewDecaissement from '../operations/decaissements';

interface ISubOperationModalProps extends IModalProps {
    operation: string,
    refreshData: () => void,
    accounts: any[],
    selected: any | null,
    setSelected: React.Dispatch<React.SetStateAction<any | null>>
}


const NewSubOperationModal = ({
    isOpen, 
    setOpen, 
    title, 
    operation, 
    refreshData, 
    accounts, 
    selected, 
    setSelected
} : ISubOperationModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)} className="overflow-modal">
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Text className="text-lg font-semibold">{title}</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>
                
                {operation === "encaissement" && 
                    <NewSubEncaissement
                        selected={selected}
                        setSelected={setSelected}
                        accounts={accounts}
                        refreshData={refreshData}
                        setOpen={setOpen} 
                    />
                }
            </div>
        </Modal>
    )
}

export default NewSubOperationModal;