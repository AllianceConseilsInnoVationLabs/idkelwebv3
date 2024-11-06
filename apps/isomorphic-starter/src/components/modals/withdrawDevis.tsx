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
    Textarea,
} from "rizzui";
import { X } from "lucide-react";
import { IModalProps, INewWithdrawProps } from '@/lib/ui-definitions';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import { CompteTypes } from '@/data/comptes/types';

import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { formatMillier } from '@/lib/utils';
import { withdrawDevis } from '@/actions/devis';

const SubmitButton = ({status = false}: {status: boolean}) => {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            className="col-span-2 mt-2"
            aria-disabled={pending}
            disabled={pending || !status}
        >
            {pending ? <Loader variant="spinner" /> :  "Encaisser"}
        </Button>
    )
}

export default function NewWithdrawModal({ isOpen, setOpen, subAccounts, devis, setDevis, refreshData}: INewWithdrawProps) {
    const { toast } = useToast();
    const [checkDate, setCheckDate] = useState<Date | null>(null);
    const [typeValue, setTypeValue] = useState<SelectOption | null>(null);
    const [senderValue, setSenderValue] = useState<SelectOption | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const withdrawDevisWithParams = withdrawDevis.bind(null, [devis, checkDate]);

    // @ts-ignore
    const [formState, action] = useFormState(withdrawDevisWithParams, undefined);

    useEffect(() => {
        if(typeValue == null) 
            return;

        let temp: any[] = [];
        subAccounts.map((a: any) => {
            a.compte_type === typeValue.value && temp.push({value: a.id, label: a.nom_compte+' - '+formatMillier(a.solde)+' '});
        });

        setAccounts(temp);
    }, [typeValue]);


    useEffect(() => {
        if(formState?.success) {
            setOpen(false);
            setDevis(null);
            setCheckDate(null);
            setTypeValue(null);
            setSenderValue(null);

            toast({
                title: "Opération effectuée",
                description: "Devis/facture a été encaissé avec succès",
                className: "bg-green-500 text-white",
            });

            refreshData();
        }
    }, [formState]);

    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)} className="overflow-modal">
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Text className="text-lg font-semibold">Encaisser un montant</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <form action={action} ref={formRef}>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
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

                        <DatePickerWithLabel 
                            label="Date de reglement" 
                            placeholder="Cliquez pour choisir une date"
                            value={checkDate}
                            setValue={setCheckDate}
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.checkdate) ? formState.errors.checkdate.join(', ') : formState?.errors?.checkdate}
                        />

                        <Select
                            label={"Vous voulez encaisser ce montant sur quel type de compte? *"}
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
                                    label={'Compte à créditer'}
                                    placeholder={"Sélectionner..."}
                                    options={accounts}
                                    value={senderValue}
                                    onChange={setSenderValue}
                                    searchable={true}
                                    searchPlaceHolder={"Rechercher..."}
                                    className="col-span-2"
                                    error={Array.isArray(formState?.errors?.compte) ? formState.errors.compte.join(', ') : formState?.errors?.compte}
                                />
                            </>
                        )}

                        <SubmitButton status={typeValue !== null && senderValue !== null && checkDate !== null} />
                    </div>
                </form>
            </div>
        </Modal>

    );
};