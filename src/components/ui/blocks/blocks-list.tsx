'use client';

import { memo, useCallback, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@nextui-org/button';
import { Link as NextLink } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useClipboard } from '@nextui-org/use-clipboard';

import { useSuspenseQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import type { Address } from 'blo';
import { blo } from 'blo';
import toast from 'react-hot-toast';

import { Flex, Tooltip, Utilization } from '^components';
import { cn, shortenString } from '^utils';

import BlockGasUsed from './block-gas-used';

import { Icon } from '^components/icon';
import { ChevronDown } from '^components/icons';
import { title } from '^components/primitives';
import { getBlocks } from '^lib/blocks/getBlocks';
import { getBlockTotalReward } from '^lib/blocks/getBlockTotalReward';
import { WEI } from '^lib/consts';
import { currencyUnits } from '^lib/units';
import type { Block } from '^types/api/block';

const TimeAgoWithTooltip = dynamic(() => import('^components/time-ago-with-tooltip'), {
   ssr: false,
});

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

const types = [
   {
      key: 'block',
      label: 'All',
   },
   {
      key: 'reog',
      label: 'Forked',
   },
   {
      key: 'uncle',
      label: 'Uncles',
   },
];

function BlocksList() {
   const pathname = usePathname();
   const router = useRouter();
   const searchParmas = useSearchParams();

   const { copy, copied } = useClipboard();

   const { isFetching, isLoading, isPending, error, data } = useSuspenseQuery(
      getBlocks({ itemsCount: 0 }),
   );

   // console.table([{ isFetching }, { isLoading }, { isPending }]);

   useEffect(() => {
      if (error) {
         toast.error(error.message);
      }
   }, [error]);

   const page = searchParmas.get('page') || 1;

   const handleNext = useCallback(() => {
      const params = new URLSearchParams(Array.from(searchParmas.entries()));

      params.set('page', String(+page + 1));
      params.set('next_page_params', encodeURIComponent(JSON.stringify(data?.next_page_params)));

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }, [data?.next_page_params, page, pathname, router, searchParmas]);

   const renderCell = useCallback(
      (block: Block, columnKey: React.Key) => {
         const cellValue = block[columnKey as keyof Block] as any;
         const totalReward = getBlockTotalReward(block);
         const burntFees = BigNumber(block.burnt_fees || 0);
         const txFees = BigNumber(block.tx_fees || 0);
         const tag = block.miner.metadata?.tags.find(tag => tag.tagType === 'name');

         switch (columnKey) {
            case 'height':
               return (
                  <>
                     <NextLink
                        as={Link}
                        className="font-mono font-semibold"
                        href={`/blocks/${cellValue}`}
                        size="sm"
                        underline="hover">
                        {cellValue}
                     </NextLink>
                     <TimeAgoWithTooltip
                        className="mt-1 font-normal text-foreground-500"
                        enableIncrement={!isLoading}
                        isLoading={isLoading}
                        timestamp={block.timestamp}
                     />
                  </>
               );
            case 'size':
               return <span className="font-mono">{Number(cellValue).toLocaleString()}</span>;
            case 'miner':
               return (
                  <div className="inline-flex items-center gap-2">
                     <Image
                        alt={`Identicon for ${block.miner.hash}}`}
                        className="rounded-full"
                        height={20}
                        src={blo(block.miner.hash as Address, 20)}
                        width={20}
                     />
                     <div>{tag?.name || shortenString(block.miner.hash)}</div>
                     <Tooltip
                        content={copied ? 'Copied' : 'Copy to clipboard'}
                        placement="bottom">
                        <button>
                           <Icon
                              icon="copy-outline"
                              onClick={() => copy(block.miner.hash)}
                           />
                        </button>
                     </Tooltip>
                  </div>
               );
            case 'tx_count':
               return (
                  <NextLink
                     as={Link}
                     className="font-mono"
                     href={`/blocks/${block.height}?tab=txs`}
                     size="sm"
                     underline="hover">
                     {cellValue}
                  </NextLink>
               );
            case 'gas_used':
               return (
                  <div className="inline-flex flex-col space-y-2">
                     <span className="font-mono">{BigNumber(cellValue || 0).toFormat()}</span>
                     <Flex className="gap-1">
                        <BlockGasUsed
                           className="font-mono"
                           gasLimit={block.gas_limit}
                           gasTarget={block.gas_target_percentage || 0}
                           gasUsed={block.gas_used || '0'}
                           isLoading={isLoading}
                        />
                     </Flex>
                  </div>
               );
            case 'reward':
               return <span className="font-mono">{totalReward.toFixed(8)}</span>;
            case 'burnt_fees':
               return (
                  <div className="inline-flex flex-col space-y-2">
                     <p className="flex items-center gap-2 font-mono">
                        <Icon icon="fire-outline" />
                        {burntFees.dividedBy(WEI).toFixed(8)}
                     </p>
                     <Tooltip
                        content="Burnt fees / Txn fees * 100%"
                        isDisabled={isLoading || isFetching || isPending}>
                        <div>
                           <Utilization
                              className="font-mono"
                              colorScheme="success"
                              isLoading={isLoading || isFetching || isPending}
                              value={burntFees.div(txFees).toNumber()}
                           />
                        </div>
                     </Tooltip>
                  </div>
               );

            default:
               return cellValue;
         }
      },
      [copied, copy, isFetching, isLoading, isPending],
   );

   const renderBody = useCallback(
      (block: Block) => (
         <TableRow key={block.height}>
            {columnKey => <TableCell>{renderCell(block, columnKey)}</TableCell>}
         </TableRow>
      ),
      [renderCell],
   );

   return (
      <div className="space-y-8">
         <h1 className={title()}>Blocks</h1>
         <Table
            aria-label="Blocks"
            classNames={{
               tr: !isLoading && cn('data-[first=true]:animate-appearance-row-in'),
               td: cn('font-medium'),
            }}
            topContent={
               <div className="flex items-start justify-between gap-2">
                  <Tabs
                     aria-label="type blocks"
                     className="-ml-1"
                     classNames={{ tabList: cn('py-0') }}
                     items={types}
                     variant="light">
                     {type => (
                        <Tab
                           key={type.key}
                           title={type.label}
                        />
                     )}
                  </Tabs>
                  <div className="flex gap-2">
                     <Button
                        size="sm"
                        onPress={() => {}}>
                        First
                     </Button>
                     <Button
                        isIconOnly
                        size="sm">
                        {page}
                     </Button>
                     <Button
                        isIconOnly
                        size="sm"
                        onPress={() => handleNext()}>
                        <ChevronDown
                           className="-rotate-90"
                           fill="currentColor"
                           size={16}
                        />
                     </Button>
                  </div>
               </div>
            }
            topContentPlacement="outside">
            <TableHeader columns={columns}>
               {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
               isLoading={isLoading}
               items={data?.items}
               loadingContent={<Spinner label="Loading..." />}>
               {renderBody}
            </TableBody>
         </Table>
      </div>
   );
}

export default memo(BlocksList);
