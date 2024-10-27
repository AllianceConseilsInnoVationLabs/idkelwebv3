"use server";

import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { LoginFormState } from '@/lib/form-definitions';
import { createSession, deleteSession, storeToSession } from '@/lib/session';

import { redirect } from 'next/navigation';

const apibase = process.env.API_BASE_URL;

export async function SignIn(state: LoginFormState, formData: FormData) {
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
     
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    let fData = new FormData();
    fData.set('email', validatedFields.data.email as string);
    fData.set('password', validatedFields.data.password as string);

    const response = await fetch(
        `${apibase}/client/login-v2`, 
        {
            method: 'POST',
            body: fData
        }
    );
    const data = await response.json();

    if(data.success) {
        await createSession(data.user, formData.get('rememberme') === 'on');
        await storeToSession('client', data.belongs[0]?.client);

        redirect('/');
    }else{
        if(data.error_email)
            return {errors: {email: ['Email incorrect']}};

        if(data.error_password)
            return {errors: {password: ['Mot de passe incorrect']}};
    }
}


export async function logout() {
    deleteSession();
    redirect('/sign-in?logout=yes');
}