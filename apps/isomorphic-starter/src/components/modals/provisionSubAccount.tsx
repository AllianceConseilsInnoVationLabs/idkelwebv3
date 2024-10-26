"use client";

import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Loader,
    Select,
    type SelectOption,
} from "rizzui";
import { X } from "lucide-react";

import { CompteTypes } from '@/data/comptes/types';
import { Banques } from '@/data/comptes/banques';
import { formatMillier } from '@/lib/utils';

import { provisionSubAccount } from '@/actions/subaccounts';
import { useFormState, useFormStatus } from 'react-dom';

interface IProvisionSubAccountProps {
    current: number,
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    subAccounts: any,
    setSubAccounts: React.Dispatch<React.SetStateAction<any>>,
    setDisplayedSubAccounts: React.Dispatch<React.SetStateAction<any>>,
    type: string
}

const SubmitButton = ({typeValue}: {typeValue: SelectOption | null}) => {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            size="lg"
            className="col-span-2 mt-2"
            aria-disabled={pending}
            disabled={pending || typeValue === null}
        >
            {pending ? <Loader variant="spinner" /> :  "Valider"}
        </Button>
    )
}

const ProvisionSubAccount = ({
    current, 
    isOpen, 
    setOpen, 
    subAccounts, 
    setSubAccounts, 
    setDisplayedSubAccounts, 
    type
} : IProvisionSubAccountProps) => {
    const [typeValue, setTypeValue] = useState<SelectOption | null>(null);
    const [senderValue, setSenderValue] = useState<SelectOption | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [formState, action] = useFormState(provisionSubAccount, undefined);
    
    useEffect(() => {
        if(typeValue == null) 
            return;

        let temp: any[] = [];

        if(typeValue.value === "Caisse"){
            subAccounts.caisses.map((a: any) => {
                a.id !== current && temp.push({value: a.id, label: a.nom_compte+' - '+formatMillier(a.solde)+' '});
            })
        }

        if(typeValue.value === "Banque"){
            subAccounts.banques.map((a: any) => {
                a.id !== current && temp.push({value: a.id, label: a.nom_compte+' - '+formatMillier(a.solde)+' '})
            });
        }

        setAccounts(temp);
    }, [typeValue]);

    useEffect(() => {
        if(formState?.success) {
            setSubAccounts(formState.comptes);
            setDisplayedSubAccounts(type === "Caisse" ? formState.comptes.caisses : formState.comptes.banques);
            setOpen(false);
        }
    }, [formState]);
    
    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Text className="text-lg font-semibold">Approvisionner le sous compte</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>
                <form action={action}>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                        <input type="hidden" name="receiver" value={current} />

                        <Input 
                            type="number" 
                            label="Montant *"
                            inputClassName="border-2"
                            size="lg"
                            className="col-span-2"
                            placeholder={'0'}
                            name="montant"
                            error={Array.isArray(formState?.errors?.montant) ? formState.errors.montant.join(', ') : formState?.errors?.montant}
                        />

                        <Select
                            label={"Vous voulez prendre ce montant depuis quel type de compte? *"}
                            placeholder={"Sélectionner..."}
                            options={CompteTypes}
                            value={typeValue}
                            onChange={setTypeValue}
                            className="col-span-2"
                        />
                        
                        {typeValue !== null && (
                            <>
                                <input type="hidden" name="compte" value={senderValue?.value || ""} />
                                <Select
                                    label={'Compte à débiter'}
                                    placeholder={"Sélectionner..."}
                                    options={accounts}
                                    value={senderValue}
                                    onChange={setSenderValue}
                                    searchable={true}
                                    searchPlaceHolder={"Rechercher..."}
                                    className="col-span-2"
                                    
                                />
                            </>
                        )}
                        
                        <SubmitButton typeValue={typeValue} />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ProvisionSubAccount;