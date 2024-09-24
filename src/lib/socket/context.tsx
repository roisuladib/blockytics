// https://hexdocs.pm/phoenix/js/
import { createContext, useContext, useEffect, useState } from 'react';

import type { SocketConnectOption } from 'phoenix';
import { Socket } from 'phoenix';

import type { Children } from '^types';

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps extends Children {
   url?: string;
   options?: Partial<SocketConnectOption>;
}

export function SocketProvider({ children, url, options }: SocketProviderProps) {
   const [socket, setSocket] = useState<Socket | null>(null);

   useEffect(() => {
      if (!url) return;

      const socketInstance = new Socket(url, options);

      socketInstance.connect();
      setSocket(socketInstance);

      return () => {
         socketInstance.disconnect();
         setSocket(null);
      };
   }, [options, url]);

   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
   const context = useContext(SocketContext);

   if (context === undefined) {
      throw new Error('useSocket must be used within a SocketProvider');
   }

   return context;
}
