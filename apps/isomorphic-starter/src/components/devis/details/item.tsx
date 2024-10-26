
import { Title, Text } from 'rizzui';
import { FactureItem, FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import { formatMillier } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Item({ product: item }: { product: any }) {
  
  
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-4 first:pt-0 sm:flex sm:gap-6 2xl:py-4">
      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Title
            as="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
           { item.produit?.nom_produit || item.service?.nom_service }
          </Title>
          <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
            { formatMillier(item.montant) }
          </span>
        </div>
        <Text className="mt-1 w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          { item.type !== 'produit' ? "Service" : "Matériel" }
        </Text>
        
        {item.type === 'materiel' && item.magasin_id && (
        <Text className=" w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          Magasin : { item.magasin.libelle }
        </Text>
        )}

        <div className="flex items-end justify-between">
          <ul className="flex flex-wrap md:gap-x-4 md:gap-y-3 sm:gap-x-8">
            <li className="flex items-center gap-3 text-gray-500">
              <span>Quantité :</span>
              <span className="text-gray-1000">{ item.quantity }</span>
            </li>
            
            <li className="flex items-center gap-3 text-gray-500">
              <span>Prix unitaire :</span>
              <span className="text-gray-1000">{ formatMillier(item.price) } </span>
            </li>
            
            { item.type_remise && (
              <>
                <li className="flex items-center gap-3 text-gray-500">
                  <span>Remise :</span>
                  <span className="text-gray-1000">
                    {item.type_remise === "%" ? item.remise + "%" : item.type_remise === 'number' ? formatMillier(item.valeur_remise) + "" : formatMillier(Number(item.valeur_remise)) + " "}
                  </span>
                </li>
                
                { item.type_remise === "%" && (
                  <li className="flex items-center gap-3 text-gray-500">
                    <span>Valeur de la remise :</span>
                    <span className="text-gray-1000">
                      { formatMillier(Number(item.valeur_remise)) } 
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>

        </div>
      </div>
      <div className="col-span-full flex items-center justify-between xs:hidden"></div>
    </div>
  );
}
