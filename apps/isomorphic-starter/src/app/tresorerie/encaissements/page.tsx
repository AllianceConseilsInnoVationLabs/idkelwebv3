"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { Facture } from '@/lib/definitions';
import Devis from '@/components/tables/devis/devis';
import Encaissements from '@/components/tables/encaissements/encaissements';
import { getInitials } from '@/lib/utils';

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
        name: 'Encaissements',
    },
];


export default function EncaissementsPage() {
    const { setTitle, setBreadcrumb } = useTitle();
    const [items, setItems] = useState<Facture[]>([]);

    setTitle('Encaissements');
    setBreadcrumb(breadcrumb);

    useEffect(() => {
        (async () => {
            const datas = await fetch('/api/tresorerie/encaissements', {
                method: 'GET'
            }).then((res) => res.json());
            
            setItems(datas.items);
        })();
    }, []);

    return (
        <div>
            {items.length > 0 && <Encaissements className="w-full rounded-2xl border-none bg-idkel-gray" datas={items} />}
        </div>
    )
};