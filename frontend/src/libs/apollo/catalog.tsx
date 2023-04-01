import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { ENDPOINTS } from '~/constants/endpoints';
import createApolloClient from './create-client';

export const catalogApolloClient = createApolloClient(ENDPOINTS.CATALOG_API.ROOT);

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
