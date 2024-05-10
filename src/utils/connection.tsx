import React, { useContext, useEffect, useMemo } from 'react';
import {
  AccountInfo,
  clusterApiUrl,
  Connection,
  PublicKey,
} from '@solana/web3.js';
import tuple from 'immutable-tuple';
import * as anchor from '@coral-xyz/anchor';
import { useLocalStorageState, useRefEqual } from './utils';
import { refreshCache, setCache, useAsyncData } from './fetch-loop';

const ConnectionContext = React.createContext<{
  endpoint: string;
  setEndpoint: (string: string) => void;
  connection: Connection;
} | null>(null);

export const MAINNET_URL = 'https://solana-api.projectserum.com';
// No backup url for now. Leave the variable to not break wallets that
// have saved the url in their local storage, previously.
export const MAINNET_BACKUP_URL = 'https://solana-api.projectserum.com/';

export function ConnectionProvider({ children }) {
  const [endpoint, setEndpoint] = useLocalStorageState(
    'connectionEndpoint',
    MAINNET_URL
  );

  const connection = useMemo(
    () => new Connection(endpoint, 'recent'),
    [endpoint]
  );

  return (
    <ConnectionContext.Provider value={{ endpoint, setEndpoint, connection }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection(): Connection {
  let context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.connection;
}

export function useConnectionConfig() {
  let context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return { endpoint: context.endpoint, setEndpoint: context.setEndpoint };
}

export function useSolanaExplorerUrlSuffix() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  const endpoint = context.endpoint;
  if (endpoint === clusterApiUrl('devnet')) {
    return '?cluster=devnet';
  } else if (endpoint === clusterApiUrl('testnet')) {
    return '?cluster=testnet';
  }
  return '';
}

export async function getMultipleSolanaAccounts(
  connection: Connection,
  publicKeys: PublicKey[]
): Promise<
  Array<null | { publicKey: PublicKey; account: AccountInfo<Buffer> }>
> {
  return anchor.utils.rpc.getMultipleAccounts(connection, publicKeys);
}
