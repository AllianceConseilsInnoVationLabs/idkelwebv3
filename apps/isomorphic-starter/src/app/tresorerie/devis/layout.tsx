import { metaObject } from '@/config/site.config';
import React from 'react';

export const metadata = {
    ...metaObject('Devis & Factures'),
};

export default function TresorerieDevisLayout({ children }: { children: React.ReactNode }) {
    return children;
}