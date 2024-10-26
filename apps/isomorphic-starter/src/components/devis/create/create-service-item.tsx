import React, { useEffect, useState } from 'react';
import { Button, Input, Select, SelectOption } from 'rizzui';
import { ICreateItemServiceProps } from '@/lib/ui-definitions';
import { remiseOptions } from '@/data/devis-data';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FactureItemMagasin, FactureItemService } from '@/lib/definitions';

const CreateServiceItem = ({setButton, className = '', services, newItem, setNewItem} : ICreateItemServiceProps) => {
    const [service, setService] = useState<SelectOption | null>(null);
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [serviceQuantity, setServiceQuantity] = useState<number>(1);
    const [remiseType, setRemiseType] = useState<SelectOption | null>(null);
    const [remiseValue, setRemiseValue] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
      let temp = services.map((service) => {
        return {
          value: service.id,
          label: service.nom_service,
        }
      });

      setServiceOptions(temp);
    }, []);
    
    /**
     * Mettre à jour le prix total, 
     * la valeur de remise et son montant,
     * et générer le montant total
     */
    useEffect(() => {
        let temp = servicePrice * serviceQuantity;

        let obj: any = {
          pu: servicePrice,
          qte: serviceQuantity,
        };

        if(remiseType !== null && remiseType.value !== 'no'){    
            if(remiseType.value === 'pourcentage'){
                obj = {
                    ...obj,
                    remise: {
                        type: 'pourcentage',
                        value: remiseValue
                    }
                };

                setTotal(temp - (temp * remiseValue / 100));
            }else{
              obj = {
                ...obj,
                remise: {
                  type: 'montant',
                  value: remiseValue
                }
              };

              setTotal(temp - remiseValue);
            }

            setNewItem({
              ...newItem,
              ...obj
            });
        }else{
            const {remise, ...rest} = newItem;
            setNewItem({
              ...rest,
              ...obj
            });
            setTotal(temp);
        }
    }, [remiseType, remiseValue, servicePrice, serviceQuantity]);


    /**
     * Mettre à jour le bouton de soumission
     * en fonction de la valeur du service et du total
     */
    useEffect(() => {
        if(service !== null && total > 0){
            setButton(true);
        }else{
            if(total == 0 && remiseType !== null && remiseType.value !== 'no')
                setButton(true);
            else
                setButton(false);
        }

        setNewItem({
            ...newItem,
            total: total
        });
    }, [service, total]);

    const handleServiceChange = (option: any) => {
        setService(option);
        setNewItem({
            ...newItem,
            service_id: option.value
        })
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
                className="col-span-2"
                error={''}
            />

            {service !== null && (
                <>
                    <Input 
                        label={"Prix unitaire"} 
                        type="number" 
                        onChange={(e) => setServicePrice(Number(e.target.value))}  
                        placeholder={"Ex: 1000"} 
                    />

                    <Input 
                        label={"Quantité"} 
                        type="number" 
                        onChange={(e) => setServiceQuantity(Number(e.target.value))} 
                        value={serviceQuantity}
                        suffix={
                            <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                              <button
                                type="button"
                                className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                onClick={() => setServiceQuantity((prevState) => prevState + 1)}
                              >
                                <ChevronUpIcon className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                onClick={() => setServiceQuantity((prevState) => prevState - 1)}
                              >
                                <ChevronDownIcon className="h-3 w-3" />
                              </button>
                            </div>
                          }
                    />

                    <Select
                        label={"Type de remise *"}
                        placeholder={"Sélectionner ..."}
                        options={remiseOptions}
                        value={remiseType}
                        onChange={setRemiseType}
                        error={''}
                    />

                    {remiseType !== null && remiseType.value !== 'no' && (
                        <Input 
                            label={"Remise"} 
                            type="number" 
                            min={0} 
                            onChange={(e) => setRemiseValue(Number(e.target.value))} 
                            value={remiseValue}
                            suffix={
                                <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                                  <button
                                    type="button"
                                    className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                    onClick={() => setRemiseValue((prevState) => prevState + 1)}
                                  >
                                    <ChevronUpIcon className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                    onClick={() => setRemiseValue((prevState) => prevState - 1)}
                                  >
                                    <ChevronDownIcon className="h-3 w-3" />
                                  </button>
                                </div>
                              }
                        />
                    )}

                    <Input 
                        label={"Quantité"} 
                        type="number" 
                        min={1} 
                        className="col-span-2" 
                        value={total} 
                        disabled={true}
                    />
                </>
            )}
        </div>
    )
}

export default CreateServiceItem;