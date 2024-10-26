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

import { newSubAccount } from '@/actions/subaccounts';
import { useFormState, useFormStatus } from 'react-dom';

import { Banques } from '@/data/comptes/banques';
import { INewSubAccountProps } from '@/lib/ui-definitions';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            size="lg"
            className="col-span-2 mt-2"
            aria-disabled={pending}
            disabled={pending}
        >
        {pending ? <Loader variant="spinner" /> :  "Valider"}
        </Button>
    )
}

function renderDisplayValue(value: SelectOption) {
    return (
        <span className="flex items-center gap-2">
            <Text>{value.label} - {value.value}</Text>
        </span>
    )
}

function renderOptionDisplayValue(option: SelectOption) {
    return (
        <div className="flex items-center gap-3">
            <Text fontWeight="medium">{option.label}</Text>
            <Text>{option.value}</Text>
        </div>
    )
}

const NewSubAccount = ({isOpen, setOpen, type, setSubAccounts, setDisplayedSubAccounts}: INewSubAccountProps) => {
    const [formState, action] = useFormState(newSubAccount, undefined);
    const [value, setValue] = useState<SelectOption | null>(null);
    
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
                    <Text className="text-lg font-semibold">Créer un sous compte { type.toLowerCase() }</Text>
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
                        <input type="hidden" name="compte_type" value={type} />
                        
                        {type == 'Caisse' && (
                            <Input 
                                label="Libellé du compte *" 
                                inputClassName="border-2" 
                                size="lg"
                                className="col-span-2"
                                placeholder={type == 'Caisse' ? 'Ex: Caisse principale' : 'Ex: Compte courant'}
                                name="libelle"
                                error={Array.isArray(formState?.errors?.libelle) ? formState.errors.libelle.join(', ') : formState?.errors?.libelle}
                            />
                        )}
                        
                        {type === "Banque" && (
                            <>
                                <input type="hidden" name="libelle" value={value?.value || ""} />
                                <Select
                                    label={'Banque *'}
                                    placeholder={"Sélectionner..."}
                                    options={Banques}
                                    value={value}
                                    onChange={setValue}
                                    searchable={true}
                                    searchPlaceHolder={"Rechercher..."}
                                    className="col-span-2"
                                    displayValue={(value: SelectOption) => renderDisplayValue(value)}
                                    getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
                                    error={Array.isArray(formState?.errors?.libelle) ? formState.errors.libelle.join(', ') : formState?.errors?.libelle}
                                />
                            </>
                        )}
                        
                        <Input 
                            type="number" 
                            label="Solde initial *"
                            inputClassName="border-2"
                            size="lg"
                            className="col-span-2"
                            placeholder={'0'}
                            name="solde"
                            error={Array.isArray(formState?.errors?.solde) ? formState.errors.solde.join(', ') : formState?.errors?.solde}
                        />

                        {type === "Banque" && (
                            <Input 
                                label="Numéro de compte *"
                                inputClassName="border-2"
                                size="lg"
                                className="col-span-2"
                                name="code"
                                error={Array.isArray(formState?.errors?.code) ? formState.errors.code.join(', ') : formState?.errors?.code}
                            />
                        )}
                        
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </Modal>
    )
};

export default NewSubAccount;