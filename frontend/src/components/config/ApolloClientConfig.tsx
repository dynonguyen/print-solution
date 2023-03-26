import { ApolloProvider } from '@apollo/client';
import React from 'react';
import catalogApolloClient from '~/libs/apollo/catalog';
import chatApolloClient from '~/libs/apollo/chat';
import notificationApolloClient from '~/libs/apollo/notification';

// -----------------------------
interface ApolloClientConfigProps {
  children?: React.ReactNode;
}

// -----------------------------
const ApolloClientConfig: React.FC<ApolloClientConfigProps> = ({ children }) => {
  return (
    <ApolloProvider client={catalogApolloClient}>
      <ApolloProvider client={notificationApolloClient}>
        <ApolloProvider client={chatApolloClient}>{children}</ApolloProvider>
      </ApolloProvider>
    </ApolloProvider>
  );
};

export default ApolloClientConfig;
