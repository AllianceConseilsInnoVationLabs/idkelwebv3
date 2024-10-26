"use client";
import { createContext, use, useState } from 'react';

export const titleContext = createContext<{
    title: string;
    breadcrumb: any[] | undefined;
    setTitle: (title: string) => void;
    setBreadcrumb: (breadcrumb: any[] | undefined) => void;
}>({
    title: '',
    breadcrumb: undefined,
    setTitle: () => {},
    setBreadcrumb: () => {}
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
    const [title, setTitle] = useState<string>('');
    const [breadcrumb, setBreadcrumb] = useState<any[] | undefined>(undefined);

    return (
        <titleContext.Provider value={{ title, setTitle, breadcrumb, setBreadcrumb }}>
            {children}
        </titleContext.Provider>
    )
};

export const useTitle = () => {
    const context = use(titleContext);

    if (context === undefined) {
        throw new Error('usePageTitle must be used within an PageTitleProvider');
    }

    return context;
}