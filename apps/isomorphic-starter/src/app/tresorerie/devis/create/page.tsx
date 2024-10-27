"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import {  Button, Empty, EmptyProductBoxIcon } from 'rizzui';
import CustomerInfo from '@/components/devis/create/customer-info';
import { Plus, Save } from 'lucide-react';
import NewDevisItem from '@/components/modals/newDevisItem';
import Item from '@/components/devis/item/item';
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
        name: 'Créer un devis',
    },
];

const customers = [
    {
        name: "Blondy",
        contact: "0123456789",
        email: "blondy@example.com",
    },
    {
        name: "Metamorphose Sp",
        contact: "0123456789",
        email: "metamorphose@example.com",
    },
    {
        name: "Bonjour",
        contact: "0123456789",
        email: "bonjour@example.com",
    },
    {
        name: "De Jaham",
        contact: "0123456789",
        email: "dejeham@example.com",
    },
    {
        name: "Spoon",
        contact: "0123456789",
        email: "spoon@example.com",
    },
];

export default function DevisCreate() {
    const { setTitle, setBreadcrumb } = useTitle();
    // const [items, setItems] = useState<FactureItem[]>(DevisItems);
    const [items, setItems] = useState<any[]>([]);
    const [isNewItemOpen, setIsNewItemOpen] = useState(false);
    const [customerId, setCustomerId] = useState<null | number>(null);
    const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
    

    const [customers, setCustomers] = useState<any[]>([]);
    const [services, setServices] = useState<FactureItemService[]>([]);
    const [produits, setProduits] = useState<any[]>([]);
    const [magasins, setMagasins] = useState<FactureItemMagasin[]>([]);
    const [regime, setRegime] = useState<string>('');
    const [tva, setTva] = useState<number>(0);


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
            const datas = await fetch('/api/tresorerie/devis-factures/datas', {
                method: 'GET'
            }).then((res) => res.json());

            setCustomers(datas.customers);
            setRegime(datas.client.regime);
            setServices(datas.services);
            setProduits(datas.produits);
            setMagasins(datas.magasins);
        })();
    }, []);

    // Vérification du regime pour la TVA
    useEffect(() => {
        regime === 'RSI' || regime === 'rsi' ? setTva(18) : setTva(0);
    }, [regime]);

    setTitle('Devis & Factures');
    setBreadcrumb(breadcrumb);

    return (
        <div>
            <SelectDevisCustomer 
                isOpen={openCustomerDialog}
                setOpen={setOpenCustomerDialog}
                customers={customers}
                onSelect={setCustomerId}
            />
            <NewDevisItem 
                isOpen={isNewItemOpen} 
                setOpen={setIsNewItemOpen} 

                services={services}
                magasins={magasins}

                items={items}
                setItems={setItems}
            />
            <div  className={'isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium'}>
                <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                    <div className="flex-grow @5xl:col-span-8 @5xl:pb-10 @6xl:col-span-7 pt-10">
                        {items.length > 0 && (
                            <div className="w-full flex justify-end mb-4">
                                <Button className="flex gap-x-4" onClick={() => setIsNewItemOpen(true)}><Plus /> Ajouter un article</Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
                            <div className={''}>
                                {items.length === 0 ? (
                                    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
                                        <Empty
                                            image={<EmptyProductBoxIcon />}
                                            text="Ce devis ne comporte aucun article"
                                        />

                                        <div className="w-full flex justify-center">
                                            <Button className="flex gap-x-4" onClick={() => setIsNewItemOpen(true)}><Plus /> Ajouter un article</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {items.map((item, index) => (
                                            <Item 
                                                key={index} 
                                                product={item} 
                                                services={services} 
                                                magasins={magasins} 
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
                                        Total HT <span>{ formatMillier(totalHt) }</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        TVA { tva }% <span>{ formatMillier(totalHt * tva / 100) }</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        Total remise <span>{ formatMillier(totalRemise) }</span>
                                    </div>
                                    <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                                        Total TTC <span>{ formatMillier(totalHt - totalRemise) }</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
                        <CustomerInfo 
                            totalHT={totalHt}
                            totalTVA={totalHt * tva / 100}
                            totalRemise={totalRemise}
                            customers={customers}
                            items={items}
                            setItems={setItems}
                            setCustomers={setCustomers}
                            openCustomerDialog={openCustomerDialog} 
                            setOpenCustomerDialog={setOpenCustomerDialog} 
                            customerId={customerId}
                            setCustomerId={setCustomerId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

