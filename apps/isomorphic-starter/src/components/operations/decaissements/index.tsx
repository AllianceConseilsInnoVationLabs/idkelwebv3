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
import { INewDecaissementsProps } from '@/lib/ui-definitions';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import CreateServiceItem from '@/components/operations/encaissements/create-service-item';
import { getInitials } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';
import SelectAccounts from '@/components/operations/encaissements/select-accounts';
import { useToast } from '@/hooks/use-toast';

import { createOperation as create } from '@/actions/operations';
import CreateStockItem from '@/components/operations/encaissements/create-stock-item';
import { set } from 'lodash';

const typeOptions = [
    {value: 'service', label: 'Service'},
    {value: 'stock', label: 'Stock'},
];

function renderDisplayValue(value: SelectOption) {
    return (
      <span className="flex items-center gap-2">
        <Avatar
            name={ String(value.label) }
            initials={ getInitials(String(value.label)) }
            className="!w-7 !h-7"
            color="primary"
        />
        <Text>{value.label}</Text>
      </span>
    )
}
  
function renderOptionDisplayValue(option: SelectOption) {
    return (
      <div className="flex items-center gap-3">
        <Avatar
            name={ String(option.label) }
            initials={ getInitials(String(option.label)) }
            className="w-9 h-9"
            color="primary"
        />
        <div>
          <Text fontWeight="medium">{option.label}</Text>
          <Text>{option.subvalue}</Text>
        </div>
      </div>
    )
}

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

const NewDecaissement = ({ 
    subAccounts,
    tvas,
    regime,
    refreshData,
    setOpen,
    charges,
    fournisseurs,
} : INewDecaissementsProps) => {
    const { toast } = useToast();
    const [tvaSelect, setTvaSelect] = useState<SelectOption | null>(null);
    
    const [tva, setTva] = useState<number>(0);
    const [accountSelected, setAccountSelected] = useState<boolean>(false);
    const [sellmode, setSellMode] = useState<string>('total');
    const [fournisseur, setFournisseur] = useState<SelectOption | null>(null);
    const [charge, setCharge] = useState<SelectOption | null>(null);
    
    const [factureDate, setFactureDate] = useState<Date | null>(new Date());
    const [checkDate, setCheckDate] = useState<Date | null>(new Date());
    const [chargesOptions, setChargesOptions] = useState<SelectOption[]>([]);
    const [fournisseursOptions, setFournisseursOptions] = useState<SelectOption[]>([]);
    const [tvasOptions, setTvasOption] = useState<SelectOption[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const createDecaissement = create.bind(null, [
        'decaissement', // Operation
        null, // Client
        checkDate, // Date de reglement
        factureDate, // Date de facturation
        sellmode, // Mode de vente
        tva, // Tva
        null, // Type
        null, // Service
        null, // Magasin
        null, // Stock
        charge, // Charge
        fournisseur, // Fournisseur
    ]);

    // @ts-ignore
    const [formState, action] = useFormState(createDecaissement, undefined);

    const handleTvaSelectChange = (option: any) => {
        setTvaSelect(option);
        setTva(option?.value);
    }

    const handleSellmode = (mode: string) => {
        setSellMode(mode);
    }
    
    const handleFournisseurChange = (option: any) => {
        setFournisseur(option);
    }
    
    const handleChargeChange = (option: any) => {
        setCharge(option);
    }

    //Construire les options pour le select des fournisseurs, des charges et des taux de tva
    useEffect(() => {
        // Générer les options pour le select des tvas
        let temp = tvas.map((t) => {
          return {
            value: t.taux,
            label: t.taux+'%'
          }
        });
        setTvasOption(temp);

        // Générer les options pour le select des charges
        temp = charges.map((c) => {
            return {
                value: c.id,
                label: c.nom_charge,
                ...c,
            }
        });
        setChargesOptions(temp);

        // Générer les options pour le select des fournisseurs
        temp = fournisseurs.map((f) => {
            return {
                value: f.id,
                label: f.nom_fournisseur+" "+(f.prenom_fournisseur ?? ''),
                subvalue: f.tel_fournisseur ?? 'N/A',
                ...f,
            }
        });
        setFournisseursOptions(temp);
    }, [tvas]);

    useEffect(() => {
        if(formState?.success) {
            formRef.current?.reset();

            setTvaSelect(null);
            setAccountSelected(false);
            setSellMode('total');
            setFournisseur(null);
            setCharge(null);

            toast({
                title: "Opération effectuée",
                description: "Décaissement enregistré avec succès",
                className: "bg-green-500 text-white",
            });

            refreshData();
            setOpen(false);
        }else if(formState?.success === false) {
            toast({
              variant: "destructive",
              title: "Oups! Une erreur est survenue",
              description: "Nous n'avons pas pu enregistrer votre opération suite à une erreur. Merci de réessayer SVP.",
            });
        }
    }, [formState]);

    return (
        <form action={action} ref={formRef}>
            <div className="grid grid-cols-2 items-start gap-y-6 gap-x-5 [&_label>span]:font-medium">
                <Input
                    label={"Intitulé *"}
                    type="text"
                    name="intitule"
                    className="col-span-2"
                    error={Array.isArray(formState?.errors?.intitule) ? formState.errors.intitule.join(', ') : formState?.errors?.intitule}
                />
                <Input
                    label={"Montant *"}
                    placeholder={"Ex: 1000"}
                    type="number"
                    name="montant"
                    error={Array.isArray(formState?.errors?.montant) ? formState.errors.montant.join(', ') : formState?.errors?.montant}
                />
                
                {(regime !== "rsi" && regime !== "RSI") ? (
                    <Input
                        label={"TVA"}
                        placeholder={"0"}
                        type="number"
                        error={''}
                        disabled={true}
                        value={tva}
                        onChange={(e:any) => setTva(e.target.value)}
                    />
                ) : (
                    <Select
                        label={"TVA *"}
                        placeholder={"Sélectionner ..."}
                        options={tvasOptions}
                        value={tvaSelect}
                        onChange={handleTvaSelectChange}
                        error={''}
                    />
                )}

                <DatePickerWithLabel 
                    label="Date de facturation" 
                    placeholder="Cliquez pour choisir une date"
                    value={factureDate}
                    setValue={setFactureDate}
                    error={Array.isArray(formState?.errors?.facturedate) ? formState.errors.facturedate.join(', ') : formState?.errors?.facturedate}
                />
                
                <DatePickerWithLabel 
                    label="Date de reglement" 
                    placeholder="Cliquez pour choisir une date"
                    value={checkDate}
                    setValue={setCheckDate}
                    error={Array.isArray(formState?.errors?.checkdate) ? formState.errors.checkdate.join(', ') : formState?.errors?.checkdate}
                />

                <Select
                    label={"Fournisseurs *"}
                    placeholder={"Sélectionner ..."}
                    options={fournisseursOptions}
                    value={fournisseur}
                    onChange={handleFournisseurChange}
                    searchable={true}
                    searchPlaceHolder={"Rechercher ..."}
                    error={''}
                    displayValue={(value: SelectOption) => renderDisplayValue(value)}
                    getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
                    className="col-span-2"
                />

                <Select
                    label={"Charges *"}
                    placeholder={"Sélectionner une charge ..."}
                    options={chargesOptions}
                    value={charge}
                    onChange={handleChargeChange}
                    error={''}
                    className="col-span-2"
                />

                <div className="flex flex-wrap gap-6 col-span-2">
                    <AdvancedRadio name="sellmode" value="total" defaultChecked alignment="center" className={`rounded-md ${sellmode === `total` ? `bg-primary text-white` : ``}`} onClick={() => handleSellmode('total')}>Paiement total</AdvancedRadio>

                    <AdvancedRadio className={`rounded-md ${sellmode === `acompte` ? `bg-primary text-white` : ``}`} name="sellmode" value="acompte" alignment="center" onClick={() => handleSellmode('acompte')}>Acompte</AdvancedRadio>

                    <AdvancedRadio className={`rounded-md ${sellmode === `credit` ? `bg-primary text-white` : ``}`} name="sellmode" value="credit"  alignment="center" onClick={() => handleSellmode('credit')}>Vente à crédit</AdvancedRadio>
                </div>

                {sellmode === 'acompte' && (
                    <Input
                        label={"Montant encaissé *"}
                        placeholder={"Ex: 1000"}
                        type="number"
                        name="partial"
                        error={Array.isArray(formState?.errors?.partial) ? formState.errors.partial.join(', ') : formState?.errors?.partial}
                    />
                )}

                {sellmode !== 'credit' && (
                    <SelectAccounts
                        subAccounts={subAccounts}
                        setAccountSelected={setAccountSelected}

                        labelType={"Type de compte à débiter *"}
                        labelCompte={"Compte à débiter *"}
                        inline={true}
                    />
                )}
                    
                <SubmitButton status={sellmode === `credit` ? (fournisseur !== null && charge !== null) : (fournisseur !== null && charge !== null && accountSelected)} />
            </div>
        </form>
    )
}

export default NewDecaissement;