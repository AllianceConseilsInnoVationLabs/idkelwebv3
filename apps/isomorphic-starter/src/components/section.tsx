import React from 'react';
import { Title } from "rizzui";
import cn from '@utils/class-names';
import { ISectionProps } from '@/lib/ui-definitions';

const SectionBlock = ({
    title,
    titleClassName,
    children,
    className,
  }: React.PropsWithChildren<ISectionProps>) => {
    return (
      <section className={className}>
        <header className="mb-2.5 lg:mb-3">
          <Title
            as="h5"
            className={cn(
              'mb-2 text-sm font-normal text-gray-700 sm:text-base',
              titleClassName
            )}
          >
            {title}
          </Title>
        </header>
  
        {children}
      </section>
    );
}

export default SectionBlock;