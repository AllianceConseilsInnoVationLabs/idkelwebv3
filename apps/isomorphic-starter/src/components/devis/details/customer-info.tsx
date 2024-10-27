import Link from 'next/link';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@ui/datepicker';
import PencilIcon from '@components/icons/pencil';
import { Text, Title, Select, ActionIcon, Input, Button, Avatar, Loader } from 'rizzui';
import cn from '@utils/class-names';
import { useEffect, useRef, useState } from 'react';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import { NewspaperIcon, Plus, Save, Trash, X } from 'lucide-react';
import { formatTel, getInitials } from '@/lib/utils';

import { routes } from '@/config/routes-idkel';
import NewCustomerModal from '@/components/modals/newCustomer';
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import { createDevis, deleteDevis } from '@/actions/devis';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@utils/format-date';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ICustomerInfoProps {
  className?: string;
  customer: any;
  facture: any;
}

export default function CustomerInfo({ 
  className,
  customer,
  facture,
}: ICustomerInfoProps) {

  return (
    <div
      className={cn(
        'pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3',
        className
      )}
    >
      <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
        <div className="relative border-b border-gray-300 pb-7">
          <Title as="h6" className="mb-6">Client</Title>

          {customer && (
            <div className="flex items-center">
              <Avatar
                name={customer.nom_client+" "+(customer.prenom_client ?? '')}
                initials={getInitials(customer.nom_client+" "+(customer.prenom_client ?? ''))}
                size="xl"
                color="primary"
              />
              <div className="ps-4 @5xl:ps-6">
                <Title as="h6" className=" font-semibold">
                  {customer.nom_client+" "+(customer.prenom_client ?? '')}
                </Title>
                <Text as="p" className=" break-all last:mb-0">
                  {customer.email_client ?? "Pas d'email"}
                </Text>
                <Text as="p" className=" last:mb-0">
                  {formatTel(customer.tel_client ?? 'Pas de contact')}
                </Text>
              </div>
            </div>
          )}    
        </div>
        
        {facture && (
        <>
          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4 border-b border-gray-300 pb-7">
            <Title as="h6" className="mb-2"> Informations </Title>

            <Input
                label="Numéro de facture"
                value={facture.numero_facture}
                disabled={true}
            />
            
            <Input
                label="Date d'émission"
                value={formatDate(facture.date_facture, "D MMM YYYY")}
                disabled={true}
            />
            
            <Input
                label="Date d'émission"
                value={formatDate(facture.date_echeance, "D MMM YYYY")}
                disabled={true}
            />
            
          </div>
          
          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4 border-b border-gray-300 pb-7">
            <Title as="h6" className="mb-2"> Moyen de paiement </Title>

            <Input
                value={facture.mode_paiement === "Portefeuille Odigo" ? "Portefeuille Idkel" : facture.mode_paiement}
                disabled={true}
            />
          </div>

          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4">
            
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                <Button className="w-full flex gap-x-4 hover:bg-gray-200" color="danger">
                  <Trash size={18} /> Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Voulez-vous supprimer cet élément?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action une fois validée sera irréversible et les données associées seront supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {deleteDevis(facture.id)}}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button className="w-full flex gap-x-4 hover:bg-gray-200" color="secondary">
              <Link href={routes.tresorerie.devis.index} className='flex gap-x-4'> 
                <X size={18} /> Retour 
              </Link>
            </Button>
          </div>
        </>
      )}
      </div>
  
    </div>
  );
}
