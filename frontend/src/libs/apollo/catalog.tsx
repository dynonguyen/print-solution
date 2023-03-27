import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

export const catalogApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/catalog`);

const CatalogApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={catalogApolloClient}>{children}</ApolloProvider>;
};

export function withCatalogApolloProvider<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <CatalogApolloProvider>
      <Component {...props} />
    </CatalogApolloProvider>
  );
}

export default CatalogApolloProvider;
