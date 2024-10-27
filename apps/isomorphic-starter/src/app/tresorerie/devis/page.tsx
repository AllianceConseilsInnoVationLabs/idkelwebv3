"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { Facture } from '@/lib/definitions';
import Devis from '@/components/tables/devis/devis';
import { Loader } from 'rizzui';
import NewWithdrawModal from '@/components/modals/withdrawDevis';

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
    const [subAccounts, setSubAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [withdrawDevis, setWithdrawDevis] = useState<any | null>(null);

    setTitle('Devis & Factures');
    setBreadcrumb(breadcrumb);

    const refreshData = async () => {
        setLoading(true);
        const datas = await fetch('/api/tresorerie/devis-factures', {
            method: 'GET'
        }).then((res) => res.json());
        
        setItems(datas.items);
        setSubAccounts(datas.subaccounts);
        setLoading(false);
    }

    useEffect(() => {
        (refreshData)();
    }, []);

    useEffect(() => {
        console.log('Devis : ', withdrawDevis);
    }, [withdrawDevis]);

    return (
        <div className={`w-full ${loading ? 'flex justify-center h-[80vh]' : ''}`}>
            {loading && <Loader variant='spinner' size="xl" />}
            {items.length > 0 && !loading && <Devis 
                className="w-full rounded-2xl border-none bg-idkel-gray" 
                datas={items}
                refreshData={refreshData}
                setWithdrawOpen={setIsWithdrawOpen}
                withdrawOpen={isWithdrawOpen}
                withdrawDevis={withdrawDevis}
                setWithdrawDevis={setWithdrawDevis}
            />}

            <NewWithdrawModal 
                isOpen={isWithdrawOpen} 
                setOpen={setIsWithdrawOpen} 
                subAccounts={subAccounts} 
                devis={withdrawDevis}
                setDevis={setWithdrawDevis}
                refreshData={refreshData}
            />
        </div>
    )
};