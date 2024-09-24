'use client';

import { memo } from 'react';

import { Button } from '@nextui-org/button';

import { Avatar, ConnectKitButton } from 'connectkit';

import { cn } from '^utils';

import { withConnectKit } from '../hoc';

function ConnectWallet() {
   return (
      <ConnectKitButton.Custom>
         {({ isConnected, show, truncatedAddress, ensName, address, isConnecting }) => (
            <Button
               {...(isConnected && {
                  startContent: (
                     <Avatar
                        address={address}
                        size={24}
                     />
                  ),
               })}
               className={cn('bg-default-100 text-sm font-normal text-default-600')}
               isLoading={isConnecting && !isConnected}
               onPress={show}>
               {isConnected
                  ? (ensName ?? truncatedAddress ?? '')
                  : isConnecting && !isConnected
                    ? 'Connecting...'
                    : 'Connect wallet'}
            </Button>
         )}
      </ConnectKitButton.Custom>
   );
}

export default withConnectKit(memo(ConnectWallet));
