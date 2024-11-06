import React, { useEffect, useState } from 'react';
import { Button, Input, Select, SelectOption } from 'rizzui';
import { ICreateItemServiceProps } from '@/lib/ui-definitions';
import { remiseOptions } from '@/data/devis-data';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FactureItemMagasin, FactureItemService } from '@/lib/definitions';

const CreateServiceItem = ({className = '', services, setServiceOrStockGood, service, setService} : ICreateItemServiceProps) => {
    const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
      let temp = services.map((service) => {
        return {
          value: service.id,
          label: service.nom_service,
        }
      });

      setServiceOptions(temp);
    }, [services]);

    useEffect(() => {
        if(service !== null && setServiceOrStockGood) {
            setServiceOrStockGood(true);
        }
    }, [service]);

    const handleServiceChange = (option: any) => {
        if(setService)
            setService(option);
    }
    return (
        <div className={className}>
            <Select
                label={"Service *"}
                placeholder={"Sélectionner un service ..."}
                options={serviceOptions}
                value={service}
                onChange={handleServiceChange}
                searchable={true}
                searchPlaceHolder={"Rechercher ..."}
                error={''}
            />
        </div>
    )
}

export default CreateServiceItem;