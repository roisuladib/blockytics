'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";

import { useNavigation } from '^hooks';

import { currencyUnits } from '^lib/units';

const columns = [
   {
      key: 'height',
      label: 'Height',
   },
   {
      key: 'size',
      label: 'Size, bytes',
   },
   {
      key: 'miner',
      label: 'Validator',
   },
   {
      key: 'tx_count',
      label: 'Txn',
   },
   {
      key: 'gas_used',
      label: 'Gas used',
   },
   {
      key: 'reward',
      label: `Reward ${currencyUnits.ether}`,
   },
   {
      key: 'burnt_fees',
      label: `Burnt fees ${currencyUnits.ether}`,
   },
];

export default function Accounts() {
   const { router, pathname, searchParams } = useNavigation();

   useEffect(() => {
      const url = `${pathname}?${searchParams}`;

      console.log(url);
   }, [pathname, searchParams]);

   const handleSetParams = useCallback(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('page', '5');
      params.set('limit', '76');
      const url = `${pathname}?${params}`;

      router.replace(url);
   }, [pathname, router, searchParams]);

   const query = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

   console.log('query', query);

   return (
      <div className="">
         <div className="">Accounts</div>
         <Table
            aria-label="Loading Accounts table"
            classNames={{ td: 'font-medium' }}>
            <TableHeader columns={columns}>
               {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody>
               {[...Array(50)].map((_, i) => (
                  <TableRow key={i}>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">Tony Reichert</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">77,649</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">Active</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">127</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">8,892,719</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">0.04770930</Skeleton>
                     </TableCell>
                     <TableCell>
                        <Skeleton className="w-fit rounded-small">0.17044620</Skeleton>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <Button
            color="primary"
            onPress={handleSetParams}>
            Update
         </Button>
      </div>
   );
}
