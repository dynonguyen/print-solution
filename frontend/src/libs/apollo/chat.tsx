import { ApolloProvider } from '@apollo/client';
import { ENDPOINTS } from '~/constants/endpoints';
import createApolloClient from './create-client';

export const chatApolloClient = createApolloClient(ENDPOINTS.CHAT_API.ROOT);

const ChatApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={chatApolloClient}>{children}</ApolloProvider>;
};

export function withChatApolloProvider<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <ChatApolloProvider>
      <Component {...props} />
    </ChatApolloProvider>
  );
}

export default ChatApolloProvider;
