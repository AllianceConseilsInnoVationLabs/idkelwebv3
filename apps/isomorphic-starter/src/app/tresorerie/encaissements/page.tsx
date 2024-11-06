"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { EncaissementHistoryItem, Facture, FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import Devis from '@/components/tables/devis/devis';
import Encaissements from '@/components/tables/encaissements/encaissements';
import { getInitials } from '@/lib/utils';
import { Loader } from 'rizzui';
import NewOperationModal from '@/components/modals/newOperation';
import HistoryOperationModal from '@/components/modals/historyOperation';
import { historiqueEncaissements } from '@/data/mouvements/encaissements';

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
    const [loading, setLoading] = useState(true);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);

    const [isNewOpen, setNewOpen] = useState<boolean>(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

    const [customers, setCustomers] = useState<any[]>([]);
    const [services, setServices] = useState<FactureItemService[]>([]);
    const [produits, setProduits] = useState<any[]>([]);
    const [magasins, setMagasins] = useState<FactureItemMagasin[]>([]);
    const [subAccounts, setSubAccounts] = useState<any[]>([]);
    const [tvas, setTvas] = useState<any[]>([]);
    const [regime, setRegime] = useState<string>('');
    const [historyData, setHistoryData] = useState<EncaissementHistoryItem[]>(historiqueEncaissements);

    setTitle('Encaissements');
    setBreadcrumb(breadcrumb);

    const refreshData = async () => {
        setLoading(true);
        const datas = await fetch('/api/tresorerie/encaissements', {
            method: 'GET'
        }).then((res) => res.json());
        
        console.log(datas);

        setItems(datas.items);
        setCustomers(datas.customers);
        setServices(datas.services);
        setProduits(datas.produits);
        setMagasins(datas.magasins);
        setSubAccounts(datas.subaccounts);
        setTvas(datas.tvas);
        setRegime(datas.regime);

        setLoading(false);
    }

    useEffect(() => {
        (refreshData)();
    }, []);

    return (
        <div className={`w-full ${loading ? 'flex justify-center h-[80vh]' : ''}`}>
            {loading && <Loader variant='spinner' size="xl" />}
            {items.length > 0 && !loading && <Encaissements 
                className="w-full rounded-2xl border-none bg-idkel-gray" 
                datas={items}
                setNewOpen={setNewOpen}
                refreshData={refreshData}

                openHistory={isHistoryOpen}
                setOpenHistory={setIsHistoryOpen}
                setHistoryData={setHistoryData}
                isHistoryLoading={isHistoryLoading}
                setIsHistoryLoading={setIsHistoryLoading}
            />}

            <NewOperationModal 
                operation={'encaissement'}
                title="Nouvel encaissement"
                isOpen={isNewOpen} 
                setOpen={setNewOpen}
                customers={customers}
                services={services}
                produits={produits}
                magasins={magasins}
                subAccounts={subAccounts}
                regime={regime}
                tvas={tvas}
                refreshData={refreshData}
            />

            <HistoryOperationModal
                isOpen={isHistoryOpen}
                setOpen={setIsHistoryOpen}
                accounts={subAccounts}
                loading={isHistoryLoading}
                setLoading={setIsHistoryLoading}
                historyData={historyData}
            />
        </div>
    )
};