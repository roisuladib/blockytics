'use client';

import { memo, useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import BlocksList from './blocks-list';

import { subtitle } from '^components/primitives';
import { useSocketChannel, useSocketMessage } from '^lib/socket';
import type { Block, BlocksResponse, BlockType } from '^types/api/block';

const OVERLOAD_COUNT = 75;
// const TABS_HEIGHT = 88;

type Props = {
   type?: BlockType;
   enableSocket?: boolean;
   top?: number;
};

function BlocksContent({ type, enableSocket, top }: Props) {
   const queryClient = useQueryClient();

   const [socketAlert, setSocketAlert] = useState('');
   const [newItemsCount, setNewItemsCount] = useState(0);

   const handleNewBlockMessage = useCallback(
      (payload: { average_block_time: string; block: Block }) => {
         queryClient.setQueryData<BlocksResponse>(['blocks', 0], prevData => {
            const shouldAddToList = !type || type === payload.block.type;

            if (!prevData) {
               return {
                  items: shouldAddToList ? [payload.block] : [],
                  next_page_params: null,
               };
            }

            if (
               !shouldAddToList ||
               prevData.items.some(block => block.height === payload.block.height)
            ) {
               return prevData;
            }

            if (prevData.items.length >= OVERLOAD_COUNT) {
               setNewItemsCount(prev => prev + 1);

               return prevData;
            }

            const newItems = [payload.block, ...prevData.items].sort(
               (b1, b2) => b2.height - b1.height,
            );

            return { ...prevData, items: newItems };
         });
      },
      [queryClient, type],
   );

   const handleSocketClose = useCallback(() => {
      setSocketAlert('Connection is lost. Please refresh the page to load new blocks.');
   }, []);

   const handleSocketError = useCallback(() => {
      setSocketAlert(
         'An error has occurred while fetching new blocks. Please refresh the page to load new blocks.',
      );
   }, []);

   const channel = useSocketChannel({
      topic: 'blocks:new_block',
      onSocketClose: handleSocketClose,
      onSocketError: handleSocketError,
      isDisabled: !enableSocket,
   });

   useSocketMessage({
      channel,
      event: 'new_block',
      handler: handleNewBlockMessage,
   });

   return (
      <>
         <p className={subtitle()}>{newItemsCount}</p>
         <BlocksList />
      </>
   );
}

export default memo(BlocksContent);
