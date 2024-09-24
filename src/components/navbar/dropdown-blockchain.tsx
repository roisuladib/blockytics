'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { NavbarItem } from '@nextui-org/navbar';

const items = [
   {
      href: '/txs',
      icon: 'scale',
      label: 'Transactions',
   },
   {
      href: '/ops',
      icon: 'flash',
      label: 'User operations',
   },
   {
      href: '/blocks',
      icon: 'activity',
      label: 'Blocks',
   },
   {
      href: '/accounts',
      icon: 'user',
      label: 'Top Accounts',
   },
   {
      href: '/verfied-contracts',
      icon: 'server',
      label: 'Verfied contracts',
   },
];

export default function DropdownBlockchain({ icons }: { icons: Record<string, any> }) {
   return (
      <Dropdown>
         <NavbarItem>
            <DropdownTrigger>
               <Button
                  disableRipple
                  className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light">
                  Blockchain
               </Button>
            </DropdownTrigger>
         </NavbarItem>
         <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
               base: 'gap-4',
            }}
            items={items}>
            {item => (
               <DropdownItem
                  key={item.href}
                  as={Link}
                  href={item.href}
                  startContent={icons[item.icon]}>
                  {item.label}
               </DropdownItem>
            )}
         </DropdownMenu>
      </Dropdown>
   );
}
