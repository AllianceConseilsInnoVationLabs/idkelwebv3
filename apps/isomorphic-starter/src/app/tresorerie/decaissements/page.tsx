"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import { EncaissementHistoryItem, Facture, FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import Devis from '@/components/tables/devis/devis';
import { getInitials } from '@/lib/utils';
import { Loader } from 'rizzui';
import NewOperationModal from '@/components/modals/newOperation';
import HistoryOperationModal from '@/components/modals/historyOperation';
import { historiqueEncaissements } from '@/data/mouvements/encaissements';
import Decaissements from '@/components/tables/decaissements/decaissements';

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
        name: 'Décaissements',
    },
];


export default function DecaissementsPage() {
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
    const [fournisseurs, setFournisseurs] = useState<any[]>([]);
    const [charges, setCharges] = useState<any[]>([]);
    const [subAccounts, setSubAccounts] = useState<any[]>([]);
    const [tvas, setTvas] = useState<any[]>([]);
    const [regime, setRegime] = useState<string>('');
    const [historyData, setHistoryData] = useState<EncaissementHistoryItem[]>(historiqueEncaissements);

    setTitle('Décaissements');
    setBreadcrumb(breadcrumb);

    const refreshData = async () => {
        setLoading(true);
        const datas = await fetch('/api/tresorerie/decaissements', {
            method: 'GET'
        }).then((res) => res.json());

        console.log(datas);

        setItems(datas.items);
        setCustomers(datas.customers);
        setServices(datas.services);
        setProduits(datas.produits);
        setMagasins(datas.magasins);
        setCharges(datas.charges);
        setFournisseurs(datas.fournisseurs);
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
            {items.length > 0 && !loading && <Decaissements 
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
                operation={'decaissement'}
                title="Nouveau décaissement"
                isOpen={isNewOpen}
                setOpen={setNewOpen}
                customers={customers}
                services={services}
                produits={produits}
                magasins={magasins}
                charges={charges}
                fournisseurs={fournisseurs}
                subAccounts={subAccounts}
                regime={regime}
                tvas={tvas}
                refreshData={refreshData}
            />

            {subAccounts.length > 0 && <HistoryOperationModal
                isOpen={isHistoryOpen}
                setOpen={setIsHistoryOpen}
                accounts={subAccounts}
                loading={isHistoryLoading}
                setLoading={setIsHistoryLoading}
                historyData={historyData}
            />}
        </div>
    )
};