import Image from 'next/image';
import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@components/shape/underline';
import { metaObject } from '@/config/site.config';

//Images


import React from 'react';

export const metadata = {
  ...metaObject('Connexion'),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          Bienvenue{'. '}
          <span className="relative inline-block">
            Connectez vous
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          pour continuer.
        </>
      }
      description="Renseignez vos identifiants dans le formulaire ci-dessous pour vous connecter"
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
      amet sint velit officia consequat duis."
      pageImage={
        // <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
        <div className="relative w-full h-full">
          <Image
            src={
              '/auth-login-illustration.png'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
