"use server";

import { SignJWT, jwtVerify } from 'jose';
import { User } from '@/lib/definitions';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Encrypts a payload using the HS256 algorithm and returns a signed JWT token.
 *
 * @param {any} payload - The payload to be encrypted.
 * @return {Promise<string>} The signed JWT token.
 */
export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

/**
 * Decrypts a session token.
 *
 * @param {string | undefined} session - The session token to decrypt.
 * @return {Promise<any>} The decrypted payload.
 */
export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })

        return payload
    } catch (error) {
        console.error('Failed to verify session');
    }
}

/**
 * Creates a new user session and sets the session cookie.
 *
 * @param {User} UserInfos - The user information to be stored in the session.
 * @param {boolean} persist - Whether the session should persist across browser restarts. Defaults to false.
 * @return {Promise<void>} A promise that resolves when the session has been created and the cookie has been set.
 */
export async function createSession(UserInfos: User, persist = false) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ UserInfos, expiresAt, persist });
   
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

/**
 * Retrieves the current user session from the session cookie.
 *
 * @return {Promise<any | null>} The decrypted session payload, or null if the session is invalid or does not exist.
 */
export async function getSession() {
    let session = cookies().get('session')?.value;
    const payload = await decrypt(session);
   
    if (!session || !payload) 
        return null
    
    return payload;
}

/**
 * Updates the current user session by checking if the session should persist and updating the expiration date accordingly.
 *
 * @return {Promise<any | null>} The updated session payload, or null if the session is invalid or does not exist.
 */
export async function updateSession() {
    let session = cookies().get('session')?.value;
    const payload = await decrypt(session);
   
    if (!session || !payload) {
      return null
    }
    
    if(payload.persist){
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        payload.expiresAt = expires;
        session = await encrypt(payload);

        cookies().set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expires,
            sameSite: 'lax',
            path: '/',
        });
    }
}

export async function deleteSession() {
    cookies().delete('session');
}

/**
 * Stores a key-value pair in the session cookie with an expiration date of 7 days from now.
 *
 * @param {string} key - The key to store the value under.
 * @param {any} value - The value to store.
 * @return {Promise<void>} A promise that resolves when the session has been updated.
 */
export async function storeToSession(key:string, value:any){
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const dataToStore = await encrypt({ [key]: value, expiresAt });

    cookies().set(key, dataToStore, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

/**
 * Retrieves the stored data associated with the given key from the session cookie.
 *
 * @param {string} key - The key used to retrieve the stored data.
 * @return {Promise<any | null>} - The decrypted payload associated with the key, or null if the data or payload is invalid or does not exist.
 */
export async function retrieveStored(key:string){
    let data = cookies().get(key)?.value;
    const payload = await decrypt(data);

    if (!data || !payload) 
        return null
    
    return payload[key];
}