import { metaObject } from '@/config/site.config';
import React from 'react';

export const metadata = {
    ...metaObject('Encaissements'),
};

export default function TresorerieDecaissementLayout({ children }: { children: React.ReactNode }) {
    return children;
}