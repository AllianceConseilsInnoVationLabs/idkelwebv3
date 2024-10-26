'use client';

import { Placement } from '@floating-ui/react';
import { PiTrashBold, PiTrashFill } from 'react-icons/pi';
import { ActionIcon, Popover, Title, Text, Button } from 'rizzui';
import cn from '@utils/class-names';
// import { useCart } from '@/store/quick-cart/cart.context';

interface RemoveItemProps {
  productID: number;
  className?: string;
  placement: Placement;
}

export default function RemoveItem({
  productID,
  className,
  placement,
}: RemoveItemProps) {
  // const { clearItemFromCart } = useCart();
  return (
    <Popover placement={placement}>
      <Popover.Trigger>
        <ActionIcon
          variant="text"
          rounded="full"
          className="hover:border-red-light h-auto w-auto border border-muted p-2"
          onClick={() => {}}
        >
          <PiTrashBold className="text-red-light h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content
        className={cn(
          'z-50 dark:bg-gray-100 dark:[&>svg]:fill-gray-100',
          className
        )}
      >
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm sm:items-center"
            >
              <PiTrashFill className="me-1 h-5 w-5" /> Supprimer
            </Title>
            <Text className="mb-2 leading-relaxed">
              Voulez-vous supprimer cette ligne? Cette action sera irréversible.
            </Text>
            <div className="flex items-center justify-end">
              <Button size="sm" onClick={() => setOpen(false)} className="me-1.5 h-7">
                Oui
              </Button>
              <Button size="sm" onClick={() => setOpen(false)} variant="outline" className="h-7">
                Non
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
