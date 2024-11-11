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
import { getInitials } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import SelectAccounts from '@/components/operations/encaissements/select-accounts';
import { useToast } from '@/hooks/use-toast';
import { INewSubEncaissementProps } from '@/lib/ui-definitions';


import { createSubOperation as create } from '@/actions/operations';
import { CreateSubOperationForm } from '@/lib/form-definitions';

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

const SubOperation = ({
    refreshData,
    setOpen,
    accounts,
    selected,
    setSelected,
}: INewSubEncaissementProps) => {
    const formRef = useRef(null);
    const [checkDate, setCheckDate] = useState<Date | null>(new Date());
    const [accountSelected, setAccountSelected] = useState(false);
    
    const createWithParams = create.bind(null, ['encaissement', selected, checkDate]);

    // @ts-ignore
    const [formState, action] = useFormState<CreateSubOperationForm>(createWithParams, undefined);

    useEffect(() => {

    }, [formState]);

    return (
        <form action={action} ref={formRef}>
            <div className="grid grid-cols-2 items-start gap-y-6 gap-x-5 [&_label>span]:font-medium">
                <Input
                    label={"Montant *"}
                    placeholder={"Ex: 1000"}
                    type="number"
                    name="partial"
                    defaultValue={selected?.montant - (selected?.partial_amount || 0)}
                    error={Array.isArray(formState?.errors?.montant) ? formState?.errors.montant.join(', ') : formState?.errors?.montant}
                />
                <DatePickerWithLabel 
                    label="Date de reglement" 
                    placeholder="Cliquez pour choisir une date"
                    value={checkDate}
                    setValue={setCheckDate}
                    error={Array.isArray(formState?.errors?.checkdate) ? formState?.errors.checkdate.join(', ') : formState?.errors?.checkdate}
                />

                <SelectAccounts 
                    subAccounts={accounts}
                    setAccountSelected={setAccountSelected}
                />

                <SubmitButton status={accountSelected} />
            </div>
        </form>
    )
}

export default SubOperation;