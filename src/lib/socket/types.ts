/* eslint-disable prettier/prettier */
import type { Channel } from 'phoenix';

import type { NewBlockSocketResponse } from '^types/api/block';

export type SocketMessageParams =
   | SocketMessage.NewBlock
   | SocketMessage.BlocksIndexStatus
   | SocketMessage.InternalTxsIndexStatus;

interface SocketMessageParamsGeneric<Event extends string | undefined, Payload extends object | unknown> {
   channel: Channel | undefined;
   event: Event;
   handler: (payload: Payload) => void;
}

export namespace SocketMessage {
   export type NewBlock = SocketMessageParamsGeneric<'new_block', NewBlockSocketResponse>;
   export type BlocksIndexStatus = SocketMessageParamsGeneric<'block_index_status', {finished: boolean; ratio: string}>;
   export type InternalTxsIndexStatus = SocketMessageParamsGeneric<'internal_txs_index_status', {finished: boolean; ratio: string}>;
}
