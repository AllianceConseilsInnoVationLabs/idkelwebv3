"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { Facture } from '@/lib/definitions';
import Devis from '@/components/tables/devis/devis';

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
    },
];


export default function DevisFactures() {
    const { setTitle, setBreadcrumb } = useTitle();
    const [items, setItems] = useState<Facture[]>([]);

    setTitle('Devis & Factures');
    setBreadcrumb(breadcrumb);

    const refreshData = async () => {
        const datas = await fetch('/api/tresorerie/devis-factures', {
            method: 'GET'
        }).then((res) => res.json());
        
        setItems(datas.items);
    }

    useEffect(() => {
        (refreshData)();
    }, []);

    

    return (
        <div>
            {items.length > 0 && <Devis 
                className="w-full rounded-2xl border-none bg-idkel-gray" 
                datas={items}
                refreshData={refreshData}
            />}
        </div>
    )
};