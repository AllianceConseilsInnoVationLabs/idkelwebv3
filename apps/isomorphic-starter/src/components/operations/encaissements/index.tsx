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
import { INewEncaissementProps } from '@/lib/ui-definitions';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import CreateServiceItem from '@/components/operations/encaissements/create-service-item';
import { getInitials } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';
import SelectAccounts from '@/components/operations/encaissements/select-accounts';
import { useToast } from '@/hooks/use-toast';

import { createOperation as create } from '@/actions/operations';
import CreateStockItem from '@/components/operations/encaissements/create-stock-item';

const typeOptions = [
    {value: 'service', label: 'Service'},
    {value: 'stock', label: 'Stock'},
];

function renderDisplayValue(value: SelectOption) {
    return (
      <span className="flex items-center gap-2">
        <Avatar
            name={ value.nom_client+" "+(value.prenom_client ?? '') }
            initials={ getInitials(value.nom_client+" "+(value.prenom_client ?? '')) }
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
            name={ option.nom_client+" "+(option.prenom_client ?? '') }
            initials={ getInitials(option.nom_client+" "+(option.prenom_client ?? '')) }
            className="w-9 h-9"
            color="primary"
        />
        <div>
          <Text fontWeight="medium">{option.label}</Text>
          <Text>{option.value}</Text>
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

const NewEncaissement = ({ 
    services,
    magasins, 
    produits, 
    customers, 
    subAccounts,
    tvas,
    regime,
    refreshData,
    setOpen
} : INewEncaissementProps) => {
    const { toast } = useToast();
    const [type, setType] = useState<SelectOption | null>(null);
    const [customer, setCustomer] = useState<SelectOption | null>(null);
    const [tvaSelect, setTvaSelect] = useState<SelectOption | null>(null);
    
    const [tva, setTva] = useState<number>(0);
    const [serviceOrStockGood, setServiceOrStockGood] = useState<boolean>(false);
    const [accountSelected, setAccountSelected] = useState<boolean>(false);
    const [sellmode, setSellMode] = useState<string>('total');

    const [service, setService] = useState<SelectOption | null>(null);
    const [magasin, setMagasin] = useState<SelectOption | null>(null);
    const [stock, setStock] = useState<SelectOption | null>(null);
    
    const [factureDate, setFactureDate] = useState<Date | null>(new Date());
    const [checkDate, setCheckDate] = useState<Date | null>(new Date());
    const [customerOptions, setCustomersOption] = useState<SelectOption[]>([]);
    const [tvasOptions, setTvasOption] = useState<SelectOption[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const createEncaissement = create.bind(null, [
        'encaissement', // Operation
        customer?.id, // Client
        checkDate, // Date de reglement
        factureDate, // Date de facturation
        sellmode, // Mode de vente
        tva, // Tva
        type?.value, // Type
        service?.value, // Service
        magasin, // Magasin
        stock, // Stock
        null, // Charge
        null, // Fournisseur
    ]);

    // @ts-ignore
    const [formState, action] = useFormState(createEncaissement, undefined);

    const handleTypeChange = (option: any) => {
        setType(option);
        setServiceOrStockGood(false);
    }

    const handleTvaSelectChange = (option: any) => {
        setTvaSelect(option);
        setTva(option?.value);
    }
    
    const handleCustomerChange = (option: any) => {
        setCustomer(option);
    }

    const handleSellmode = (mode: string) => {
        setSellMode(mode);
    }

    //Construire les options pour le select des clients et des taux de tva
    useEffect(() => {
        // Générer les options pour le select des clients
        let temp = customers.map((c) => {
          return {
            value: c.id,
            label: c.nom_client+" "+(c.prenom_client ?? ''),
            ...c
          }
        });
        setCustomersOption(temp);
        
        // Générer les options pour le select des tvas
        temp = tvas.map((t) => {
          return {
            value: t.taux,
            label: t.taux+'%'
          }
        });
        setTvasOption(temp);
    }, [customers]);

    useEffect(() => {
        if(formState?.success) {
            formRef.current?.reset();

            setCustomer(null);
            setTvaSelect(null);
            setType(null);
            setServiceOrStockGood(false);
            setAccountSelected(false);
            setService(null);
            setSellMode('total');
            setMagasin(null);
            setStock(null);

            toast({
                title: "Opération effectuée",
                description: "Encaissement enregistré avec succès",
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
                    label={"Client *"}
                    placeholder={"Sélectionner ..."}
                    options={customerOptions}
                    value={customer}
                    onChange={handleCustomerChange}
                    className="col-span-2"
                    searchable={true}
                    searchPlaceHolder={"Rechercher ..."}
                    error={''}
                    displayValue={(value: SelectOption) => renderDisplayValue(value)}
                    getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
                />

                {customer && (
                    <>
                        <Select
                            label={"Encaisser pour *"}
                            placeholder={"Sélectionner ..."}
                            options={typeOptions}
                            value={type}
                            onChange={handleTypeChange}
                            error={''}
                        />

                        {type && 
                            (
                                <>
                                    {type?.value === 'service' && (
                                        <CreateServiceItem
                                            services={services}
                                            setServiceOrStockGood={setServiceOrStockGood}
                                            service={service}
                                            setService={setService}
                                        />
                                    )}
                                    
                                    {type?.value === 'stock' && (
                                        <CreateStockItem
                                            magasins={magasins}
                                            setServiceOrStockGood={setServiceOrStockGood}
                                            className="col-span-2"

                                            magasin={magasin}
                                            setMagasin={setMagasin}

                                            stock={stock}
                                            setStock={setStock}

                                            state={formState}
                                        />
                                    )}
                                    
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
                                        />
                                    )}
                                </>
                            )
                        }
                    </>
                )}
                    
                <SubmitButton status={sellmode === `credit` ? (serviceOrStockGood) : (serviceOrStockGood && accountSelected)} />
            </div>
        </form>
    )
}

export default NewEncaissement;