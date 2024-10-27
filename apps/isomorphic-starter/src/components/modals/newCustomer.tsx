import React, { useEffect, useRef } from 'react';
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Loader,
    Select,
    type SelectOption,
    Textarea,
} from "rizzui";
import { X } from "lucide-react";
import { IModalProps, INewCustomerProps } from '@/lib/ui-definitions';

import { createCustomer } from '@/actions/customer';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            className="col-span-2 mt-2"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? <Loader variant="spinner" /> :  "Créer"}
        </Button>
    )
}


export default function NewCustomerModal({ isOpen, setOpen, customers, setCustomers, setCustomerId }: INewCustomerProps) {
    const [formState, action] = useFormState(createCustomer, undefined);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if(formState?.success) {
            formRef.current?.reset();

            toast({
                title: "Client créé",
                description: "Vous avez créé un nouveau client avec succès",
                className: "bg-green-500 text-white",
            });

            setCustomers([...customers, formState.customer]);
            setCustomerId(formState.customer.id);
            setOpen(false);
        }
    }, [formState]);

    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Text className="text-lg font-semibold">Créer un client</Text>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <form action={action} ref={formRef}>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                        <Input 
                            label={"Nom *"} 
                            type="text"
                            name="nom"
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.nom) ? formState.errors.nom.join(', ') : formState?.errors?.nom}
                        />
                        <Input 
                            label={"Prénoms"} 
                            type="text"
                            name="prenoms"
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.prenom) ? formState.errors.prenom.join(', ') : formState?.errors?.prenom}
                        />
                        <Input 
                            label={"Email *"} 
                            type="email"
                            name="email"
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.email) ? formState.errors.email.join(', ') : formState?.errors?.email}
                        />
                        <Input 
                            label={"Téléphone *"} 
                            type="text"
                            name="telephone"
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.telephone) ? formState.errors.telephone.join(', ') : formState?.errors?.telephone}
                        />
                        <Textarea
                            name="adresse"
                            label="Adresse géographique"
                            className="col-span-2"
                            error={Array.isArray(formState?.errors?.adresse) ? formState.errors.adresse.join(', ') : formState?.errors?.adresse}
                        />

                        <SubmitButton />
                    </div>
                </form>
            </div>
        </Modal>

    );
};