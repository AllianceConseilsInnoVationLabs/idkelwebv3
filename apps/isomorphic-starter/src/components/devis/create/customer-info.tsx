import Link from 'next/link';
import PencilIcon from '@components/icons/pencil';
import { Text, Title, Select, ActionIcon, Input, Button, Avatar, Loader } from 'rizzui';
import cn from '@utils/class-names';
import { useEffect, useRef, useState } from 'react';
import DatePickerWithLabel from '@/components/ui/datepickerwithlabel';
import { NewspaperIcon, Plus, Save, X } from 'lucide-react';
import { formatTel, getInitials } from '@/lib/utils';

import { routes } from '@/config/routes-idkel';
import NewCustomerModal from '@/components/modals/newCustomer';
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import { createDevis } from '@/actions/devis';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface ICustomerInfoProps {
  className?: string;
  customers: any[],
  items: any[],
  totalHT: number,
  totalTVA: number,
  totalRemise: number,
  
  openCustomerDialog: boolean,
  setOpenCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>,
  customerId: number | null,
  setCustomers: React.Dispatch<React.SetStateAction<any[]>>,
  setCustomerId: React.Dispatch<React.SetStateAction<number | null>>,
  setItems: React.Dispatch<React.SetStateAction<any[]>>,
}

export default function CustomerInfo({ 
  totalHT,
  totalTVA,
  totalRemise,
  className, 
  customers, 
  setOpenCustomerDialog, 
  customerId, 
  setCustomers, 
  setCustomerId,
  items,
  setItems,
}: ICustomerInfoProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [emissionDate, setEmissionDate] = useState<Date | null>(null);
  const [echeanceDate, setEcheanceDate] = useState<Date | null>(null);
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const createDevisWithParams = createDevis.bind(null, [items, customerId, emissionDate, echeanceDate, {
    ht: totalHT,
    tva: totalTVA,
    remise: totalRemise
  }]);
  
  // @ts-ignore
  const [formState, action] = useFormState(createDevisWithParams, undefined); 
  const customer = customers.find((customer) => customer.id === customerId);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            className="w-full flex gap-x-4"
            aria-disabled={pending}
            disabled={pending || !canSubmit}
        >
            {pending ? 
                <Loader variant="spinner" /> : 
                <>
                    <Save size={18} /> 
                    <span>Enregistrer</span>
                </>
            }
        </Button>
    )
  }

  // Activation du bouton de soumission
  useEffect(() => {
    if(items.length > 0 && customerId) {
        setCanSubmit(true);
    } else {
        setCanSubmit(false);
    }
  }, [items, customerId]);


  const { toast } = useToast();
  useEffect(() => {
      if(formState?.success) {
        toast({
            title: "Devis créé",
            description: "Vous avez créé un nouveau devis avec succès",
            className: 'bg-green-500 text-white',
        });

        setItems([]);
        setCustomerId(null);
        setEcheanceDate(null);
        setEmissionDate(null);
        setPaymentMethod('Cash');
        
        router.push(routes.tresorerie.devis.index);
      }else if(formState?.success === false) {
        toast({
          variant: "destructive",
          title: "Oups! Une erreur est survenue",
          description: "Nous n'avons pas pu créer votre devis suite à une erreur. Merci de réessayer SVP.",
      });
      }
  }, [formState]);

  return (
    <div
      className={cn(
        'pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3',
        className
      )}
    >
      <NewCustomerModal 
        isOpen={isNewCustomerOpen} 
        setOpen={setIsNewCustomerOpen} 
        customers={customers} 
        setCustomers={setCustomers} 
        setCustomerId={setCustomerId}
      />
      
      <form action={action} ref={formRef}>
        <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
          <div className="relative border-b border-gray-300 pb-7">
            <Title as="h6" className="mb-6">Client</Title>

            {customerId !== null && (
              <>
                <ActionIcon
                  className="absolute -top-1.5 end-0 z-10 text-gray-600 dark:text-gray-800"
                  rounded="full"
                  variant="flat"
                  size="sm"
                  onClick={() => setOpenCustomerDialog(true)}
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </ActionIcon>

                <ActionIcon
                  className="absolute -top-1.5 end-10 z-10 text-gray-600 dark:text-gray-800 bg-primary"
                  rounded="full"
                  variant="flat"
                  size="sm"
                  onClick={() => setIsNewCustomerOpen(true)}
                >
                  <PlusIcon className="h-3.5 w-3.5 text-white" />
                </ActionIcon>
              </>
            )}

            {customerId !== null && (
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
            
            {customerId === null && (
              <>
                <div onClick={() => setOpenCustomerDialog(true)} className="flex bg-idkel-purpleaccent hover:bg-primary p-4 w-full rounded-lg justify-center items-center group cursor-pointer">
                  <Button className="w-full rounded-full bg-primary p-0 w-9 h-9 flex gap-x-4 justify-center group-hover:bg-primary-dark">
                      <Plus width={22} height={22} className="text-white" />
                  </Button>
                </div>
                <Button className="w-full mt-2 rounded-lg" onClick={() => setIsNewCustomerOpen(true)}>Créer un nouveau client</Button>
              </>
            )}
          </div>

          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4 border-b border-gray-300 pb-7">
            <Title as="h6" className="mb-2"> Informations </Title>

            <Input
                label="Numéro de facture"
                placeholder="Ex: 00001"
                name="num_facture"
                error={Array.isArray(formState?.errors?.numero) ? formState.errors.numero.join(', ') : formState?.errors?.numero}
            />
            <DatePickerWithLabel 
                label="Date d'émission" 
                placeholder="Cliquez pour choisir une date"
                value={emissionDate}
                setValue={setEmissionDate} 
                error={Array.isArray(formState?.errors?.emission) ? formState.errors.emission.join(', ') : formState?.errors?.emission}
            />
            <DatePickerWithLabel 
                label="Date d'échéance" 
                name="date_echeance"
                placeholder="Cliquez pour choisir une date" 
                value={echeanceDate} 
                setValue={setEcheanceDate} 
                error={Array.isArray(formState?.errors?.echeance) ? formState.errors.echeance.join(', ') : formState?.errors?.echeance}
            />
          </div>
          
          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4 border-b border-gray-300 pb-7">
            <Title as="h6" className="mb-2"> Moyen de paiement </Title>

            <Select
              dropdownClassName="!z-0"
              options={paymentOptions}
              value={paymentMethod}
              onChange={(value: string) => setPaymentMethod(value)}
              error={''}
              getOptionValue={(option) => option.label}
              name="payment_method"
            />
          </div>

          <div className="space-y-2 @lg:space-y-2s @2xl:space-y-2 mt-4">
            <SubmitButton />

            <Button className="w-full flex gap-x-4 hover:bg-gray-200" color="secondary">
              <Link href={routes.tresorerie.devis.index} className='flex gap-x-4'> 
                <X size={18} /> Annuler 
              </Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Payment method option
const paymentOptions = [
  {
    value: 'cash',
    label: 'Cash',
  },
  {
    value: 'cheque',
    label: 'Chèque',
  },
  {
    value: 'virement',
    label: 'Virement bancaire',
  },
  {
    value: 'mobilemoney',
    label: 'Mobile Money',
  },
  {
    value: 'Portefeuille Odigo',
    label: 'Portefeuille Idkel',
  },
];

// shipping option
const shippingOption = [
  {
    value: 'ups',
    label: 'UPS',
  },
  {
    value: 'usps',
    label: 'USPS',
  },
  {
    value: 'fedex',
    label: 'FedEx',
  },
];
