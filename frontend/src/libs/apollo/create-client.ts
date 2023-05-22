import { ApolloClient, ApolloClientOptions, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import keycloak from '../keycloak';

const createApolloClient = (uri: string, options?: Omit<ApolloClientOptions<any>, 'cache'>) => {
  const httpLink = createHttpLink({ uri });

  const authLink = setContext((_, { headers }) => {
    const token = keycloak.token;
    return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
    headers: {},
    ...options
  });
};

export default createApolloClient;
