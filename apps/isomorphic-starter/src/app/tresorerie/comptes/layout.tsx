import { metaObject } from '@/config/site.config';
import React from 'react';

export const metadata = {
    ...metaObject('Comptes'),
};

export default function TresorerieComptesLayout({ children }: { children: React.ReactNode }) {
    return children;
}