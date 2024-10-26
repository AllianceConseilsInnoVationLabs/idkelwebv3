
import { Title, Text } from 'rizzui';
import RemoveItem from './remove-item';
import { FactureItem, FactureItemMagasin, FactureItemService } from '@/lib/definitions';
import { formatMillier } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Item({ product: item, services, magasins }: { product: any, services: FactureItemService[], magasins: FactureItemMagasin[] }) {
  const [label, setLabel] = useState<string>('');
  const [magasinLabel, setMagasinLabel] = useState<string>('');

  useEffect(() => {
    if(item.type === 'service') {
      const service = services.find(s => s.id === item.service_id);
      setLabel(service?.nom_service ?? '');
    }

    if(item.type === 'materiel') {
      const magasin = magasins.find(m => m.id === item.magasin_id);
      setMagasinLabel(magasin?.libelle ?? '');

      const produit = magasin?.produits?.find(p => p.id === item.stock_id);
      setLabel(produit?.produit.nom_produit ?? '');
    }
  }, [])
  
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-4 first:pt-0 sm:flex sm:gap-6 2xl:py-4">
      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Title
            as="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
           { label }
          </Title>
          <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
            { formatMillier(item.total) }
          </span>
        </div>
        <Text className="mt-1 w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          { item.type === 'service' ? "Service" : "Matériel" }
        </Text>
        
        {item.type === 'materiel' && item.magasin_id && (
        <Text className=" w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          Magasin : { magasinLabel }
        </Text>
        )}

        <div className="flex items-end justify-between">
          <ul className="flex flex-wrap md:gap-x-4 md:gap-y-3 sm:gap-x-8">
            <li className="flex items-center gap-3 text-gray-500">
              <span>Quantité :</span>
              <span className="text-gray-1000">{ item.qte }</span>
            </li>
            
            <li className="flex items-center gap-3 text-gray-500">
              <span>Prix unitaire :</span>
              <span className="text-gray-1000">{ formatMillier(item.pu) } </span>
            </li>
            
            { item.remise && (
              <>
                <li className="flex items-center gap-3 text-gray-500">
                  <span>Remise :</span>
                  <span className="text-gray-1000">
                    {item.remise.type === "pourcentage" ? item.remise.value + "%" : item.remise.type === 'montant' ? formatMillier(item.remise.value) + "" : formatMillier(Number(item.remise.value)) + " "}
                  </span>
                </li>
                
                { item.remise.type === "pourcentage" && (
                  <li className="flex items-center gap-3 text-gray-500">
                    <span>Valeur de la remise :</span>
                    <span className="text-gray-1000">
                      { formatMillier(Number(((item.pu * item.qte) * item.remise.value) / 100)) } 
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="hidden md:block">
            <RemoveItem productID={item.id} placement="bottom-end" className=""/>
          </div>
        </div>
      </div>
      <div className="col-span-full flex items-center justify-between xs:hidden">
        <div className="flex items-center gap-4">
          <RemoveItem productID={item.id} placement="bottom-start" />
        </div>
      </div>
    </div>
  );
}
