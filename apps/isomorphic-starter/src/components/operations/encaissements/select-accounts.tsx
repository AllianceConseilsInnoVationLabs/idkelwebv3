import React, { useEffect, useState } from 'react';
import { Select, SelectOption } from 'rizzui';
import { CompteTypes } from '@/data/comptes/types';
import { formatMillier } from '@/lib/utils';

interface ISelectAccountsProps {
    subAccounts: any,
    setAccountSelected?: any

    labelType?: string,
    labelCompte?: string,
    inline?: boolean,
}

const SelectAccounts = ({
    subAccounts, 
    setAccountSelected, 
    labelType = "Vous voulez encaisser ce montant sur quel type de compte? *", 
    labelCompte = "Compte à créditer *",
    inline = false,
} : ISelectAccountsProps) => {
    const [typeValue, setTypeValue] = useState<SelectOption | null>(null);
    const [senderValue, setSenderValue] = useState<SelectOption | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        if(typeValue == null) 
            return;

        let temp: any[] = [];
        subAccounts.map((a: any) => {
            a.compte_type === typeValue.value && temp.push({value: a.id, label: a.nom_compte+' - '+formatMillier(a.solde)+' '});
        });

        setAccounts(temp);
    }, [typeValue, subAccounts]);

    useEffect(() => {
        if(senderValue !== null && senderValue.value !== null && setAccountSelected) {
            setAccountSelected(true);
        }
    }, [senderValue]);
    
    return (
        <>
            <Select
                label={labelType}
                placeholder={"Sélectionner..."}
                options={CompteTypes}
                value={typeValue}
                onChange={setTypeValue}
                className={inline ? "" : "col-span-2"}
            />
            
            {typeValue !== null && (
                <>
                    <input type="hidden" name="compte" value={senderValue?.value || ""} />
                    <Select
                        label={labelCompte}
                        placeholder={"Sélectionner..."}
                        options={accounts}
                        value={senderValue}
                        onChange={setSenderValue}
                        searchable={true}
                        searchPlaceHolder={"Rechercher..."}
                        className={inline ? "" : "col-span-2"}
                    />
                </>
            )}
        </>
    )
}

export default SelectAccounts;