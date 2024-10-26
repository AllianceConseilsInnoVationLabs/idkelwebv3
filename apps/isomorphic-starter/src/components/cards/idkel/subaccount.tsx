import React from 'react';
import Image from 'next/image';
import { formatMillier } from '@/lib/utils';
import { Button, Tooltip } from 'rizzui';
import { Plus, HandCoins } from 'lucide-react';
import ProvisionSubAccount from '@/components/modals/provisionSubAccount';

const IdkelSubAccountCard = (props: any) => {
    const [isProvisionOpened, setIsProvisionOpened] = React.useState(false);

    return (
        <div className="flex bg-idkel-gray p-4 w-[calc(25%-1rem)] rounded-2xl justify-between">
            <div className="flex gap-x-4">
                <div className={`w-[50px] h-[50px] flex-none bg-idkel-purpleaccent rounded-xl flex justify-center items-center`}>
                    <Image src={props.compte_type.toLowerCase() === 'caisse' ? '/assets/icons/new_coffreicon.png' : '/assets/icons/new_warehouseicon.png'} width={30} height={30} alt={'compte caisse'} />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="font-light text-sm -mt-1">{ props.nom_compte }</h3>
                    <p className="text-md font-bold">{ formatMillier(parseInt(props.solde)) } </p>
                </div>
            </div>
            <div className="flex items-center">
                <Tooltip size="sm" placement="top" content={"Approvisionner"}>
                    <Button onClick={() => setIsProvisionOpened(true)} className="w-full rounded-full p-0 w-9 h-9 flex gap-x-4 border-idkel border-[2px] justify-center bg-transparent hover:bg-idkel group">
                        <HandCoins width={22} height={22} className="text-idkel group-hover:text-white" />
                    </Button>
                </Tooltip>
            </div>

            <ProvisionSubAccount 
                current={props.id} 
                isOpen={isProvisionOpened} 
                setOpen={setIsProvisionOpened} 
                subAccounts={props.subAccounts} 
                type={props.compte_type}
                setSubAccounts={props.setSubAccounts}
                setDisplayedSubAccounts={props.setDisplayedSubAccounts}
            />
        </div>
    );
};

export default IdkelSubAccountCard;