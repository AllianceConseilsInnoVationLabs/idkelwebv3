"use client";

import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Loader,
    Select,
    type SelectOption,
} from "rizzui";
import { X } from "lucide-react";
import CreateServiceItem from '@/components/devis/create/create-service-item';
import CreateMaterielItem from '@/components/devis/create/create-materiel-item';
import { IModalProps, INewDevisItemProps } from '@/lib/ui-definitions';
import { FactureItemMagasin, FactureItemService } from '@/lib/definitions';

const typeOptions = [
    {value: 'service', label: 'Service'},
    {value: 'materiel', label: 'Matériel'},
]

const NewDevisItem = ({ isOpen, setOpen, services, magasins, items, setItems } : INewDevisItemProps) => {
    const [type, setType] = useState<SelectOption | null>(null);
    const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<any>({});

    const handleTypeChange = (option: any) => {
        setType(option);
        setNewItem({
            type: option.value
        });
    }

    const handleNewItem = (e: any) => {
        setNewItem({
            ...newItem,
            id: items.length + 1,
        });

        setItems([...items, newItem]);
        setNewItem({});
        setOpen(false);
    }
    
    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Text className="text-lg font-semibold">Ajouter un nouvel article</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>
                {/* <form> */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                        <Select
                            label={"Type d'article à ajouter *"}
                            placeholder={"Sélectionner ..."}
                            options={typeOptions}
                            value={type}
                            onChange={handleTypeChange}
                            className="col-span-2"
                            error={''}
                        />

                        {type?.value === 'service' && (
                            <CreateServiceItem 
                                className="col-span-2 grid grid-cols-2 gap-x-5 gap-y-6 [&_label>span]:font-medium" 
                                setButton={setIsSubmittable}

                                services={services}
                                newItem={newItem}
                                setNewItem={setNewItem}
                            />
                        )}
                        
                        {type?.value === 'materiel' && (
                            <CreateMaterielItem 
                                className="col-span-2 grid grid-cols-2 gap-x-5 gap-y-6 [&_label>span]:font-medium" 
                                setButton={setIsSubmittable}

                                magasins={magasins}
                                newItem={newItem}
                                setNewItem={setNewItem}
                            />
                        )}

                        <Button onClick={handleNewItem} disabled={!isSubmittable} className="col-span-2 mt-2" aria-disabled={false}>
                            Ajouter
                        </Button>
                    </div>
                {/* </form> */}
            </div>
        </Modal>
    )
}

export default NewDevisItem;