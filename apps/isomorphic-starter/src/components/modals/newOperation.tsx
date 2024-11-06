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
import NewEncaissement from '../operations/encaissements';
import NewDecaissement from '../operations/decaissements';


const NewOperationModal = ({ 
    operation, 
    title, 
    isOpen, 
    setOpen, 
    services,
    magasins, 
    produits, 
    customers, 
    subAccounts,
    tvas,
    regime,
    refreshData,
    charges,
    fournisseurs
} : INewOperationModalProps) => {
    

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

                {operation === 'encaissement' && (
                    <NewEncaissement
                        services={services}
                        magasins={magasins}
                        produits={produits}
                        customers={customers}
                        subAccounts={subAccounts}
                        tvas={tvas}
                        regime={regime}
                        refreshData={refreshData}
                        setOpen={setOpen}
                    />
                )}

                {operation === 'decaissement' && (
                    <NewDecaissement
                        charges={charges}
                        fournisseurs={fournisseurs}
                        subAccounts={subAccounts}
                        tvas={tvas}
                        regime={regime}
                        refreshData={refreshData}
                        setOpen={setOpen}
                    />
                )}
                
                    
            </div>
        </Modal>
    )
}

export default NewOperationModal;