import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client';

const createApolloClient = (uri: string, options?: ApolloClientOptions<any>) => {
  return new ApolloClient({ uri, cache: new InMemoryCache(), ...options });
};

export default createApolloClient;
