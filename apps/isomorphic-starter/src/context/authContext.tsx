"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User } from '@/lib/definitions';
import { getSession } from '@/lib/session';

export const authContext = createContext<{
    user: User | null,
    isAuthenticated: boolean
}>({
    user: null,
    isAuthenticated: false
});



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(user !== null);

    useEffect(() => {
        (async () => {
            const session = await fetch('/api/session', {
                method: 'POST'
            }).then((res) => res.json());
            
            if(session) {
                setUser(session.UserInfos);
                setIsAuthenticated(true);
            }
        })();
    }, []);

    return (
        <authContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(authContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};