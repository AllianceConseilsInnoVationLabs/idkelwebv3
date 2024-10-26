"use client";

import React, { useEffect, useState } from 'react';
import { useTitle } from '@/context/pageTitleContext';
import { routes } from "@/config/routes-idkel";

//Definitions
import { formatMillier } from '@/lib/utils';
import { ILoadingStateCollection, IStatCardProps, IStatIdkelProps } from '@/lib/ui-definitions';

import Image from 'next/image';

//UI Components
import StatCards from '@/components/stat-cards';
import IdkelStatsCard from '@/components/idkel-stats-card';
import SectionBlock from '@/components/section';
import TransactionIcon from '@components/icons/transactions';
import MoneyInHand from '@components/icons/money-in-hand';
import BusinessIcon from '@components/icons/business';
import RefundIcon from '@components/icons/refund';
import ExpenseHistory from '@/components/cards/expense-history';
import TurnoverHistory from '@/components/cards/turnover-history';
import TurnoverVsExpenses from '@/components/cards/turnover-vs-expenses';
import RealTurnoverVsPrev from '@/components/cards/real-turnover-vs-prev';
import ProfitChart from '@/components/cards/profit';
import { Loader } from 'rizzui';
import { CalendarDays, Users } from 'lucide-react';

const breadcrumb = [
    {
        href: routes.index,
        name: 'Accueil',
    },
    {
        name: 'Ma trésorerie',
    },
];

const Loading = () => {
    return (
        <div className="flex w-full bg-idkelgray rounded-2xl h-[156px] items-center justify-center">
            <Loader variant="spinner" />
        </div>
    );
}

const Page = () => {
    const { setTitle, setBreadcrumb } = useTitle();
    setTitle('Ma Trésorerie');
    setBreadcrumb(breadcrumb);

    const [soldes, setSoldes] = useState<IStatIdkelProps[]>([
        {
            icon: <Image src={'/assets/icons/new_coffreicon.png'} width={40} height={40} alt={'User Group'} />,
            title: 'Caisse',
            metric: 3590000,
        },
        {
            icon: <Image src={'/assets/icons/new_warehouseicon.png'} width={40} height={40} alt={'Banque'} />,
            title: 'Banque',
            metric: 7890000,
        },
        {
            icon: <Image src={'/assets/icons/new_moneyicon.png'} width={40} height={40} alt={'Solde total'} />,
            title: 'Idkel',
            metric: 12450000,
        },
    ]);

    const [tva, setTva] = useState<IStatIdkelProps[]>([
        {
            id: 1,
            icon: <Image src={'/assets/icons/user-group.svg'} width={40} height={40} alt={'User Group'} />,
            title: 'Collecté',
            metric: 12450000,
        },
        {
            id: 2,
            icon: <Image src={'/assets/icons/new_calculator.png'} width={40} height={40} alt={'User'} />,
            title: 'Déductible',
            metric: 3590000,
        },
        {
            id: 3,
            icon: <Image src={'/assets/icons/calendar-03.svg'} width={40} height={40} alt={'Calendar'} />,
            title: 'A Payer',
            metric: 7890000,
        },
    ]);

    const [isLoading, setIsLoading] = useState<ILoadingStateCollection>({
        tva: {
            isLoading: true,
            error: false
        },
        soldes: {
            isLoading: true,
            error: false
        }
    });

    useEffect(() => {
        (async () => {
            const datas = await fetch('/api/tresorerie', {
                method: 'GET'
            }).then((res) => res.json());
            
            setTva([
                {
                    icon: <Users width={28} height={28} className="text-idkel" />,
                    title: 'Collecté',
                    metric: datas.tva.tvacollecte,
                },
                {
                    icon: <Image src={'/assets/icons/new_calculator.png'} width={40} height={40} alt={'User'} />,
                    title: 'Déductible',
                    metric: datas.tva.tvadeductible,
                },
                {
                    icon: <CalendarDays width={28} height={28} className="text-idkel" />,
                    title: 'A Payer',
                    metric: datas.tva.tvapayer,
                },
            ]);

            setSoldes([
                {
                    icon: <Image src={'/assets/icons/new_coffreicon.png'} width={40} height={40} alt={'User Group'} />,
                    title: 'Caisse',
                    metric: datas.soldes.caisse,
                },
                {
                    icon: <Image src={'/assets/icons/new_warehouseicon.png'} width={40} height={40} alt={'Banque'} />,
                    title: 'Banque',
                    metric: datas.soldes.banque,
                },
                {
                    icon: <Image src={'/assets/icons/new_moneyicon.png'} width={40} height={40} alt={'Solde total'} />,
                    title: 'Idkel',
                    metric: datas.soldes.idkel,
                },
            ]);

            setIsLoading({
                tva: {
                    isLoading: false,
                    error: false
                },
                soldes: {
                    isLoading: false,
                    error: false
                }
            });
        })();
    }, []);
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-8">
                <SectionBlock title={'TVA'} className="w-1/2">
                    { isLoading.tva.isLoading && <Loading /> } 
                    { !isLoading.tva.isLoading && <IdkelStatsCard className="4xl:gap-8" stats={tva} />}
                </SectionBlock>

                <SectionBlock title={'Solde des comptes'} className="w-1/2">
                    { isLoading.tva.isLoading && <Loading /> }
                    { !isLoading.soldes.isLoading && <IdkelStatsCard className="4xl:gap-8" stats={soldes} />}
                </SectionBlock>
            </div>
            
            <SectionBlock title={'Progression annuelle'}>
                <div className="flex gap-x-6">
                    <TurnoverHistory className="w-1/2 bg-idkel-gray border-none rounded-2xl" />
                    <ExpenseHistory className="w-1/2 bg-idkel-gray border-none rounded-2xl" />
                </div>
            </SectionBlock>
            
            <SectionBlock title={'Comparatifs'}>
                <div className="flex gap-x-6">
                    <TurnoverVsExpenses className="w-1/2 bg-idkel-gray border-none rounded-2xl" />
                    <RealTurnoverVsPrev className="w-1/2 bg-idkel-gray border-none rounded-2xl" />
                </div>
            </SectionBlock>
            
            <SectionBlock>
                <ProfitChart className="col-span-full @3xl:col-span-full @[1429px]:col-span-8 bg-idkel-gray border-none rounded-2xl" />
            </SectionBlock>
        </div>
    );
}

export default Page;