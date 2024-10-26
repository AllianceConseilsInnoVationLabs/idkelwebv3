import React from 'react';
import { metaObject } from '@/config/site.config';

export const metadata = {
    ...metaObject('Ma trésorerie'),
};

export default function TresorerieLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}