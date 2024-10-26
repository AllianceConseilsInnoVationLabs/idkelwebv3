'use client';

import Link from 'next/link';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@components/logo';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import SearchWidget from '@/app/shared/search/search';
import { Title } from 'rizzui';
import { useTitle } from '@/context/pageTitleContext';
import Breadcrumb from '@ui/breadcrumb';

export default function Header() {
  const {title, breadcrumb} = useTitle();

  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>

        {/* <SearchWidget /> */}
        <div className="">
          <Title>{title}</Title>

          {breadcrumb && breadcrumb.length > 0 && (
            <Breadcrumb
              separator=""
              separatorVariant="circle"
              className="flex-wrap"
            >
              {breadcrumb?.map((item) => (
                <Breadcrumb.Item
                    key={item.name}
                    {...(item?.href && { href: item?.href })}
                >
                    {item.name}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
        </div>
        
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
