import React from 'react';
import {
    Modal,
    Text,
    ActionIcon,
    Avatar,
} from "rizzui";
import { X } from "lucide-react";
import { IModalProps } from '@/lib/ui-definitions';
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { getInitials } from '@/lib/utils';


interface ISelectCustomerProps extends IModalProps {
    customers: any[];
    onSelect: (customerId: number) => void;
}


const SelectDevisCustomer = ({ isOpen, setOpen, customers, onSelect }: ISelectCustomerProps) => {
    const handleSelection = (id:number) => {
        onSelect(id);
        setOpen(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
            <div className="m-auto pt-6 pb-8">
                <div className="px-7 pb-3 flex items-center justify-between">
                    <Text className="text-lg font-semibold">Ajouter un nouvel article</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <Command>
                    <CommandInput 
                        placeholder="Rechercher un client ..." 
                        className="border-none focus:ring-0" 
                        wrapperClassName="px-7 py-2 bg-idkel-gray border-none" 
                    />
                    <CommandList>
                        <CommandEmpty>Aucun résultat</CommandEmpty>
                        {customers.map((customer, index) => (
                            <CommandItem key={index} className="px-0 w-full" >
                                <div className="px-7 py-2 flex gap-x-4 hover:cursor-pointer items-center w-full" onClick={() => handleSelection(customer.id)}>
                                    <Avatar
                                        name={ customer.nom_client+" "+(customer.prenom_client ?? '') }
                                        initials={ getInitials(customer.nom_client+" "+(customer.prenom_client ?? '')) }
                                        size="sm"
                                        color="primary"
                                    />
                                    <span>{customer.nom_client+" "+(customer.prenom_client ?? '')}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </div>
        </Modal>
    )
};

export default SelectDevisCustomer;