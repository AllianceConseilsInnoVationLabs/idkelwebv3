'use client';

import Link from 'next/link';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text, Loader } from 'rizzui';
import { useFormState, useFormStatus } from 'react-dom'
import { routes } from '@/config/routes';
import { SignIn } from '@/actions/auth';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
      <Button
          type="submit"
          className="w-full"
          aria-disabled={pending}
          disabled={pending}
          size="lg"
      >
          {pending ? 
            <Loader variant="spinner" /> :  
            <>
              <span>Se connecter</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </>
          }
      </Button>
  )
}

export default function SignInForm() {
  const [formState, action] = useFormState(SignIn, undefined);
  const { pending } = useFormStatus();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if(searchParams.get('logout')) {
      window.location.href = "/sign-in";
    }
  }, []);

  useEffect(() => {
    console.log(formState);
  }, [formState])

  return (
    <>
      <form action={action}>
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="jean@email.com"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              name="email"
              // error={searchParams.get('invalid') && searchParams.get('invalid') === 'email' ? 'Veuillez saisir un email valide' : ''}
              error={Array.isArray(formState?.errors?.email) ? formState.errors.email.join(', ') : formState?.errors?.email}
            />
            <Password
              label="Mot de passe"
              placeholder="Votre mot de passe"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              name="password"
              // error={searchParams.get('invalid') && searchParams.get('invalid') === 'password' ? 'Veuillez saisir un mot de passe valide' : ''}
              error={Array.isArray(formState?.errors?.password) ? formState.errors.password.join(', ') : formState?.errors?.password}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                label="Se souvenir de moi"
                variant="flat"
                className="[&>label>span]:font-medium"
                name="rememberme"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <SubmitButton />
          </div>
        
      </form>

      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Vous n&apos;avez pas de compte?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Créer un compte
        </Link>
      </Text>
    </>
  );
}
