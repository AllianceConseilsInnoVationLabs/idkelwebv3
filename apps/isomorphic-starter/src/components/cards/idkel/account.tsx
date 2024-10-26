import React from 'react';
import { Button, Loader, Tooltip } from 'rizzui';
import Image from 'next/image';
import { formatMillier } from '@/lib/utils';
import { IIdkelAccountCardProps } from '@/lib/ui-definitions';


const IdkelAccountCard = ({
    title,
    icon,
    solde,
    attending,
    className,
    actions
} : IIdkelAccountCardProps) => {
    return (
        <div className={`flex flex-col bg-idkel-gray w-1/4 p-4 rounded-2xl gap-y-4 ${className ? className : ''}`}>
            <h3 className="font-light text-[18px]">{title}</h3>
            <div className="flex gap-x-4">
                <div className={`w-[50px] h-[50px] flex-none bg-idkel-purpleaccent rounded-xl flex justify-center items-center`}>
                    {icon}
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="font-light text-[16px] -mt-1">{ formatMillier(solde) } </h3>
                    {attending != undefined ? <p className="text-sm">Solde en attente: { formatMillier(0) } </p> : ''}
                </div>
            </div>
            <div className="flex gap-x-2">
                {actions}

                {/* <Tooltip size="sm" placement="bottom" content={"Recharger"}>
                    <Button className="w-full rounded-xl flex gap-x-4 justify-center bg-idkel-blueother" color="secondary">
                        <Image src={'/assets/icons/reload.svg'} width={20} height={20} alt="icon" /> Recharger
                    </Button>
                </Tooltip> */}
                {/* <Tooltip size="sm" placement="bottom" content={"Décaisser"}>
                    <Button className="w-full rounded-xl flex justify-center bg-idkel-red" color="secondary">
                        <Image src={'/assets/icons/cash-in.svg'} width={20} height={20} alt="icon" />
                    </Button>
                </Tooltip>
                <Tooltip size="sm" placement="bottom" content={"Encaisser"}>
                    <Button className="w-full rounded-xl flex justify-center bg-idkel-green" color="secondary">
                        <Image src={'/assets/icons/cash-out.svg'} width={20} height={20} alt="icon" />
                    </Button>
                </Tooltip> */}
            </div>
        </div>
    );
}

export default IdkelAccountCard;