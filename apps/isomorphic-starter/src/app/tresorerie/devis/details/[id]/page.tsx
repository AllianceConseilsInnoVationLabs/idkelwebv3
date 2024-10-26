"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { FactureItem, FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import { DevisItems } from '@/data/factures/factures';
import {  Button, Empty, EmptyProductBoxIcon } from 'rizzui';
import CustomerInfo from '@/components/devis/details/customer-info';
import { Plus, Save } from 'lucide-react';
import NewDevisItem from '@/components/modals/newDevisItem';
import Item from '@/components/devis/details/item';
import SelectDevisCustomer from '@/components/modals/SelectDevisCustomer';
import { formatMillier } from '@/lib/utils';

const breadcrumb = [
    {
        href: routes.index,
        name: 'Accueil',
    },
    {
        href: routes.tresorerie.dashboard,
        name: 'Ma trésorerie',
    },
    {
        name: 'Devis & Factures',
        href: routes.tresorerie.devis,
    },
    {
        name: 'Détails',
    },
];

export default function DevisDetails({ params }: { params: { id: string } }) {
    const { setTitle, setBreadcrumb } = useTitle();

    const [items, setItems] = useState<any[]>([]);
    const [customer, setCustomer] = useState<any | null>(null);
    const [facture, setFacture] = useState<any | null>(null);

    let htreducer = (acc:number, current:any) => acc + current.pu * current.qte;
    let remisereducer = (acc:number, current:any) => {
        if(current.remise?.type === 'pourcentage') {
            return acc + ((current.remise?.value * (current.qte * current.pu)) / 100);
        }

        if(current.remise?.type === 'montant') {
            return acc + current.remise?.value;
        }

        return acc;
    };

    const totalHt = items.reduce(htreducer, 0);
    const totalRemise = items.reduce(remisereducer, 0);

    useEffect(() => {
        (async () => {
            const datas = await fetch('/api/tresorerie/devis-factures/details?id=' + params.id, {
                method: 'GET'
            }).then((res) => res.json());

            console.log(datas);
            setFacture(datas.facture);
            setItems(datas.items);
            setCustomer(datas.customer);
        })();
    }, []);


    setTitle('Détails de devis/facture');
    setBreadcrumb(breadcrumb);

    return (
        <div>
            <div  className={'isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium'}>
                <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                    <div className="flex-grow @5xl:col-span-8 @5xl:pb-10 @6xl:col-span-7 pt-10">
                        <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
                            <div className={''}>
                                {items && items.length > 0 && (
                                    <>
                                        {items.map((item, index) => (
                                            <Item 
                                                key={index} 
                                                product={item} 
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {items.length > 0 && (
                            <div className="border-t border-muted pt-7 @5xl:mt-3">
                                <div className="ms-auto max-w-lg space-y-2">
                                    <div className="flex justify-between font-medium">
                                        Total HT <span>{ formatMillier(facture.montantHt) }</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        TVA <span>{ formatMillier(facture.tva) }</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        Total remise <span>{ formatMillier(facture.total_remise) }</span>
                                    </div>
                                    <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                                        Total TTC <span>{ formatMillier(facture.montantHt + facture.tva - facture.total_remise) }</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
                        <CustomerInfo 
                            customer={customer}
                            facture={facture}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

