import React, { useEffect, useState } from 'react';

import { ICreateItemMaterielProps } from '@/lib/ui-definitions';
import { remiseOptions } from '@/data/devis-data';
import { Input, Select, SelectOption } from 'rizzui';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { formatMillier } from '@/lib/utils';
import { Facture, FactureItemMagasin, MagasinItemProduit, MagasinItemProduitOccurence } from '@/lib/definitions';

const CreateMaterielItem = ({setButton, className = '', magasins, newItem, setNewItem} : ICreateItemMaterielProps) => {
    const [magasin, setMagasin] = useState<SelectOption | null>(null);
    const [produit, setProduit] = useState<SelectOption | null>(null);
    const [stock, setStock] = useState<number | null>(null);

    const [produitPrice, setProduitPrice] = useState<number>(0);
    const [produitQuantity, setProduitQuantity] = useState<number>(1);
    const [remiseType, setRemiseType] = useState<SelectOption | null>(null);
    const [remiseValue, setRemiseValue] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [magasinOptions, setMagasinOptions] = useState<SelectOption[]>([]);
    const [produitOptions, setProduitOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        let temp = magasins.map((magasin) => {
          return {
            value: magasin.id,
            label: magasin.libelle,
          }
        });
  
        setMagasinOptions(temp);
      }, []);
    
    const handleMagasin = (option: any) => {
        if(!option){
            setMagasin(null);
            const { magasin_id, ...rest } = newItem;
            setNewItem && setNewItem({...rest});

            handleProduit(null);
            return ;
        }

        setMagasin(option);
        handleProduit(null);
    }

    const handleProduit = (option: any) => {
        if(!option){
            setProduit(null);
            const { produit_id, stock_id, total, pu, qte, ...rest } = newItem;
            setNewItem && setNewItem({...rest});
            setProduitPrice(0);
            setProduitQuantity(0);

            return ;
        }

        let magasinItem: FactureItemMagasin | undefined = magasins.find(a => a.id === magasin?.value);
        let produitItem: MagasinItemProduitOccurence | MagasinItemProduit | undefined = magasinItem?.produits?.find(a => a.id === option?.value);

        if(produitItem){
            setStock(produitItem.id);
            setProduitPrice(Number(produitItem.prix_vente));

            setProduit(option);
            setNewItem && setNewItem({
                ...newItem,
                type: "materiel",
                produit_id: produitItem.produit.id,
                stock_id: produitItem.id,
                magasin_id: magasinItem?.id
            })
        }else{
            setStock(null);
            setProduitPrice(0);
        }
    }

    useEffect(() => {
        setProduit(null);

        if(!magasin){
            return ;
        }

        let magasinItem: FactureItemMagasin | undefined = magasins.find(a => a.id === magasin.value);
        console.log(magasinItem?.produits);
        let temp = magasinItem?.produits?.map((produit) => {
            return {
                value: produit.id,
                label: produit.produit.nom_produit,
            }
        })

        setProduitOptions(temp ?? []);
    }, [magasin]);

    useEffect(() => {
        let temp = produitPrice * produitQuantity;

        let obj: any = {
            pu: produitPrice,
            qte: produitQuantity,
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
            
            setNewItem && setNewItem({
                ...newItem,
                ...obj
            });
        }else{
            const {remise, ...rest} = newItem;
            setNewItem && setNewItem({
              ...rest,
              ...obj
            });

            setTotal(temp);
        }
    }, [remiseType, remiseValue, produitPrice, produitQuantity]);

    useEffect(() => {
        if(magasin !== null && total > 0){
            setButton && setButton(true);
        }else{
            if(total == 0 && remiseType !== null && remiseType.value !== 'no')
                setButton && setButton(true);
            else
                setButton && setButton(false);
        }

        setNewItem && setNewItem({
            ...newItem,
            total: total
        });
    }, [magasin, total]);

    return (
        <div className={className}>
            <Select
                label={"Magasin *"}
                placeholder={"Sélectionner un magasin ..."}
                options={magasinOptions}
                value={magasin}
                onChange={handleMagasin}
                searchable={true}
                searchPlaceHolder={"Rechercher ..."}
                className="col-span-2"
                error={''}
            />

            {magasin !== null && (
                <>
                    <Select
                        label={"Produits *"}
                        placeholder={"Sélectionner ..."}
                        options={produitOptions}
                        value={produit}
                        onChange={handleProduit}
                        searchable={true}
                        searchPlaceHolder={"Rechercher ..."}
                        className="col-span-2"
                        error={''}
                    />

                    <Input 
                        label={"Prix unitaire"} 
                        type="text" 
                        value={produitPrice}
                        onChange={(e) => setProduitPrice(Number(e.target.value))}  
                        placeholder={"Ex: 1000"} 
                    />

                    <Input 
                        label={"Quantité"} 
                        type="number" 
                        onChange={(e) => setProduitQuantity(Number(e.target.value))} 
                        value={produitQuantity}
                        suffix={
                            <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                              <button
                                type="button"
                                className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                onClick={() => setProduitQuantity((prevState) => prevState + 1)}
                              >
                                <ChevronUpIcon className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                onClick={() => setProduitQuantity((prevState) => prevState - 1)}
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
                        label={"Total"} 
                        type="text" 
                        min={1} 
                        className="col-span-2" 
                        value={formatMillier(total)} 
                        disabled={true}
                    />
                </>
            )}
        </div>
    )
}

export default CreateMaterielItem;