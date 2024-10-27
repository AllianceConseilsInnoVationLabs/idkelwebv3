"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";
import Image from 'next/image';

import SectionBlock from '@/components/section';
import IdkelAccountCard from '@/components/cards/idkel/account';

import { CreditCard, Logs, Plus, HandCoins, CirclePlus, ChartNoAxesCombined } from 'lucide-react';
import { Button, Loader, Tooltip } from 'rizzui';
import { formatMillier } from '@/lib/utils';
import IdkelSubAccountCard from '@/components/cards/idkel/subaccount';
import TurnoverVsExpenses from '@/components/cards/turnover-vs-expenses';
import ProfitChart from '@/components/cards/profit';
import { progressions } from '@/data/progressions';
import Transactions from '@/components/tables/comptes/transactions';
import { ILoadingStateCollection } from '@/lib/ui-definitions';
import { Transaction } from '@/lib/definitions';
import NewSubAccount from '@/components/modals/newSubAccount';

const Loading = () => {
    return (
        <div className="flex w-full bg-idkelgray rounded-2xl h-[182px] items-center justify-center">
            <Loader variant="spinner" />
        </div>
    );
}

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
        name: 'Comptes',
    },
];


export default function TresorerieComptes() {
    const { setTitle, setBreadcrumb } = useTitle();
    
    const [isSubAccountProgressionDisplayed, setIsSubAccountProgressionDisplayed] = React.useState(false);
    const [selectedAccountView, setSelectedAccountView] = React.useState(0);
    const [progressionTitle, setProgressionTitle] = React.useState('');
    const [progressionSolde, setProgressionSolde] = React.useState(0);
    const [progressionData, setProgressionData] = React.useState(progressions[0]);

    //Soldes
    const [idkelSolde, setIdkelSolde] = useState<number>(0);
    const [caisseSolde, setCaisseSolde] = useState<number>(0);
    const [banqueSolde, setBanqueSolde] = useState<number>(0);
    const [ecoSolde, setEcoSolde] = useState<number>(0);

    //Subaccounts
    const [subAccounts, setSubAccounts] = useState<{ caisses: any[], banques: any[] }>({ caisses: [], banques: [] });
    const [displayedSubAccounts, setDisplayedSubAccounts] = React.useState<any[]>([]);
    const [isSubAccountDisplayed, setIsSubAccountDisplayed] = React.useState<boolean>(false);
    const [subAccountTitle, setSubAccountTitle] = React.useState<string>('');

    //Transactions
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<ILoadingStateCollection>({
        subAccount: {
            isLoading: true,
            error: false
        },
    });

    //Modals states
    const [isNewSubAccountModalOpened, setIsNewSubAccountModalOpened] = React.useState<boolean>(false);

    const toggleSubAccount = (type: string) => {
        if(type === "Caisse"){
            setDisplayedSubAccounts(subAccounts.caisses);
            setSubAccountTitle("Caisse");
        }
        
        if(type === "Banque"){
            setDisplayedSubAccounts(subAccounts.banques);
            setSubAccountTitle("Banque");
        }

        setIsSubAccountDisplayed(true);
        setIsSubAccountProgressionDisplayed(false);
    }

    const handleProgression = (index: number) => {
        setSelectedAccountView(index);
        setIsSubAccountDisplayed(false);
        setIsSubAccountProgressionDisplayed(true);
        setProgressionTitle("Progression du compte " + accounts[index].title);
        setProgressionSolde(accounts[index].solde);
        setProgressionData(progressions[index]);
    };

    const accounts = [
        {
            title: 'Idkel',
            icon: <CreditCard width={30} height={30} className="text-idkel" />,
            solde: idkelSolde,
            attending: 0,
            actions: (<>
                <Tooltip size="sm" placement="bottom" content={"Approvisionner le compte"}>
                    <Button className="w-3/4 rounded-xl flex gap-x-2 justify-center bg-idkel-blueother hover:bg-primary text-white" color="secondary">
                        <CreditCard width={20} height={20} /> Recharger
                    </Button>
                </Tooltip>
                <Tooltip size="sm" placement="bottom" content={"Voir la progression"}>
                    <Button onClick={() => handleProgression(0)} className="w-1/4 rounded-xl flex gap-x-4 justify-center bg-idkel-red hover:bg-primary text-white" color="secondary">
                        <ChartNoAxesCombined width={20} height={20} />
                    </Button>
                </Tooltip>
            </>)
        },
        {
            title: 'Caisse',
            icon: <Image src={'/assets/icons/new_coffreicon.png'} width={30} height={30} alt={'compte caisse'} />,
            solde: caisseSolde,
            attending: 0,
            actions: (<>
                <Tooltip size="sm" placement="bottom" content={"Afficher les sous comptes"}>
                    <Button className="w-full rounded-xl flex gap-x-2 justify-center bg-idkel-blueother hover:bg-primary text-white" onClick={() => toggleSubAccount('Caisse') } color="secondary">
                        <Logs width={20} height={20} /> Sous comptes ({subAccounts.caisses.length})
                    </Button>
                </Tooltip>
                <Tooltip size="sm" placement="bottom" content={"Voir la progression"}>
                    <Button onClick={() => handleProgression(1)} className="w-1/4 rounded-xl flex gap-x-4 justify-center bg-idkel-red hover:bg-primary text-white" color="secondary">
                        <ChartNoAxesCombined width={20} height={20} />
                    </Button>
                </Tooltip>
            </>)
        },
        {
            title: 'Banque',
            icon: <Image src={'/assets/icons/new_warehouseicon.png'} width={30} height={30} alt={'compte banque'} />,
            solde: banqueSolde,
            attending: 0,
            actions: (<>
                <Tooltip size="sm" placement="bottom" content={"Afficher les sous comptes"}>
                    <Button className="w-full rounded-xl flex gap-x-2 justify-center bg-idkel-blueother hover:bg-primary text-white" onClick={() => toggleSubAccount('Banque')} color="secondary">
                        <Logs width={20} height={20} /> Sous comptes ({subAccounts.banques.length})
                    </Button>
                </Tooltip>
                <Tooltip size="sm" placement="bottom" content={"Voir la progression"}>
                    <Button onClick={() => handleProgression(2)} className="w-1/4 rounded-xl flex gap-x-4 justify-center bg-idkel-red hover:bg-primary text-white" color="secondary">
                        <ChartNoAxesCombined width={20} height={20} />
                    </Button>
                </Tooltip>
            </>)
        },
        {
            title: 'Economie',
            icon: <Image src={'/assets/icons/new_coffreicon.png'} width={30} height={30} alt={'compte banque'} />,
            solde: ecoSolde,
            attending: 0,
            actions: (<>
                <Button className="w-full rounded-xl flex gap-x-2 justify-center bg-idkel-blueother hover:bg-primary text-white" color="secondary">
                    <HandCoins width={20} height={20} /> {`J'économise`}
                </Button>
                <Tooltip size="sm" placement="bottom" content={"Voir la progression"}>
                    <Button onClick={() => handleProgression(3)} className="w-1/4 rounded-xl flex gap-x-4 justify-center bg-idkel-red hover:bg-primary text-white" color="secondary">
                        <ChartNoAxesCombined width={20} height={20} />
                    </Button>
                </Tooltip>
            </>)
        },
    ];

    setTitle('Comptes');
    setBreadcrumb(breadcrumb);

    useEffect(() => {
        (async () => {
            const datas = await fetch('/api/tresorerie/comptes', {
                method: 'GET'
            }).then((res) => res.json());
            
            console.log(datas);

            const {soldes, comptes} = datas;
            
            setIdkelSolde(soldes.idkel);
            setCaisseSolde(soldes.caisse);
            setBanqueSolde(soldes.banque);

            console.log(comptes);
            setSubAccounts(comptes);
            setTransactions(datas.transactions);

            setIsLoading({
                subAccount: {
                    isLoading: false,
                    error: false
                },
            });
        })();
        
        setProgressionTitle("Progression du compte " + accounts[selectedAccountView].title);
        setProgressionSolde(accounts[selectedAccountView].solde);
        setProgressionData(progressions[selectedAccountView]);
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <SectionBlock title={'Soldes des comptes'} className="w-full">
                <div className="flex gap-x-4">
                    { isLoading.subAccount.isLoading ? (
                        <>
                            { accounts.map((account, i) => (
                                <Loading key={i} />
                            )) }
                        </>
                    ) : (
                        <>
                            { accounts.map((account, i) => (
                                <IdkelAccountCard key={i} {...account} />
                            )) }
                        </>
                    ) }
                </div>
            </SectionBlock>
            
            { isSubAccountDisplayed && (
                <SectionBlock title={'Liste des sous comptes : ' + subAccountTitle} className="w-full">
                    <div className="flex gap-4 flex-wrap">
                        { displayedSubAccounts.map((subaccount, i) => (
                            <IdkelSubAccountCard 
                                key={i} {...subaccount} 
                                subAccounts={subAccounts} 
                                setSubAccounts={setSubAccounts}
                                setDisplayedSubAccounts={setDisplayedSubAccounts} 
                            />
                        ))}

                        <Tooltip size="sm" placement="top" content={"Créer un sous compte"}>
                            <div onClick={() => setIsNewSubAccountModalOpened(true)} className="flex bg-idkel-purpleaccent hover:bg-primary p-4 w-[calc(25%-1rem)] rounded-2xl justify-center items-center group cursor-pointer">
                                <Button className="w-full rounded-full bg-primary p-0 w-9 h-9 flex gap-x-4 justify-center group-hover:bg-primary-dark">
                                    <Plus width={22} height={22} className="text-white" />
                                </Button>
                            </div>
                        </Tooltip>
                    </div>

                    <NewSubAccount 
                        isOpen={isNewSubAccountModalOpened} 
                        setOpen={setIsNewSubAccountModalOpened} 
                        type={subAccountTitle} 
                        setSubAccounts={setSubAccounts}
                        setDisplayedSubAccounts={setDisplayedSubAccounts}
                    />
                </SectionBlock>
            )}

            {isSubAccountProgressionDisplayed && (
                <SectionBlock className="w-full">
                    <ProfitChart 
                        theme={'primary'} 
                        title={progressionTitle} 
                        progression={progressionData} 
                        solde={progressionSolde}
                        closeable={true}
                        closeAction={() => setIsSubAccountProgressionDisplayed(false)}
                        className="col-span-full @3xl:col-span-full @[1429px]:col-span-8 bg-idkel-gray border-none rounded-2xl" 
                    />
                </SectionBlock>
            )}

            {transactions.length > 0 && <Transactions className="w-full rounded-2xl border-none bg-idkel-gray" datas={transactions} />}
        </div>
    );
}