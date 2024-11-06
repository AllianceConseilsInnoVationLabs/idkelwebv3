import { metaObject } from '@/config/site.config';
import React from 'react';

export const metadata = {
    ...metaObject('Décaissements'),
};

export default function TresorerieEncaissementLayout({ children }: { children: React.ReactNode }) {
    return children;
}