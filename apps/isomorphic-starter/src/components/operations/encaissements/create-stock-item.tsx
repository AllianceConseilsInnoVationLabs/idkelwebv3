import React, { useEffect, useState } from 'react';
import { Button, Input, Select, SelectOption } from 'rizzui';
import { ICreateItemMaterielProps } from '@/lib/ui-definitions';
import { remiseOptions } from '@/data/devis-data';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FactureItemMagasin, FactureItemProduit, FactureItemService, FactureItemStock } from '@/lib/definitions';

const CreateStockItem = ({className = '', magasins, setServiceOrStockGood, magasin, setMagasin, stock, setStock, state} : ICreateItemMaterielProps) => {
    const [magasinOptions, setMagasinOptions] = useState<SelectOption[]>([]);
    const [produitOptions, setProduitOptions] = useState<SelectOption[]>([]);
    
    useEffect(() => {
      let temp = magasins.map((m) => {
        return {
          value: m.id,
          label: m.libelle,
          ...m
        }
      });

      setMagasinOptions(temp);
    }, [magasins]);

    const handleMagasinChange = (option: any) => {
        setMagasin && setMagasin(option);

        let temp = option.produits.map((p: FactureItemStock) => {
            return {
                value: p.id,
                label: p.produit?.nom_produit,
                ...p
            }
        });
        setProduitOptions(temp);
        setStock && setStock(null);
    }

    const handleStockChange = (option: any) => {
        setStock && setStock(option);
    }

    useEffect(() => {
        if(setServiceOrStockGood) {
            if(stock !== null) {
                setServiceOrStockGood(true);
            }else{
                setServiceOrStockGood(false);
            }
        }
    }, [stock]);

    return (
        // <div className={`flex gap-x-2 items-start  ${className}`}>
        <>
            <Select
                label={"Magasin *"}
                placeholder={"Sélectionner ..."}
                options={magasinOptions}
                value={magasin}
                onChange={handleMagasinChange}
                searchable={true}
                searchPlaceHolder={"Rechercher ..."}
                error={''}
            />

            {magasin?.value && (
                <>
                    <Select
                        label={"Produit *"}
                        placeholder={"Sélectionner ..."}
                        options={produitOptions}
                        value={stock}
                        onChange={handleStockChange}
                        searchable={true}
                        searchPlaceHolder={"Rechercher ..."}
                        error={''}
                    />
                    <Input
                        label={"Qte. *"}
                        type="number"
                        name="qte"
                        error={Array.isArray(state?.errors?.qte) ? state.errors.qte.join(', ') : state?.errors?.qte}
                    />
                </>
            )}
        </>
        // </div>
    )
}

export default CreateStockItem;