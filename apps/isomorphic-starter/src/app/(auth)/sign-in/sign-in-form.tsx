'use client';

import Link from 'next/link';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { useFormState, useFormStatus } from 'react-dom'
import { routes } from '@/config/routes';
import { SignIn } from '@/actions/auth';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignInForm() {
  const [state, action] = useFormState(SignIn, undefined);
  const { pending } = useFormStatus();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if(searchParams.get('logout')) {
      window.location.href = "/sign-in";
    }
  }, [])

  return (
    <>
      <form action={action} onSubmit={() => setLoading(true)}>
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="jean@email.com"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              name="email"
              error={searchParams.get('invalid') && searchParams.get('invalid') === 'email' ? 'Veuillez saisir un email valide' : ''}
            />
            <Password
              label="Mot de passe"
              placeholder="Votre mot de passe"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              name="password"
              error={searchParams.get('invalid') && searchParams.get('invalid') === 'password' ? 'Veuillez saisir un mot de passe valide' : ''}
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

            <Button className="w-full" type="submit" size="lg">
              {loading && <span className="loader"></span>}

              {!loading && (
                <>
                  <span>Se connecter</span>{' '}
                  <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
                </>
              )}
              
            </Button>
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
