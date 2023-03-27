import { ApolloProvider } from '@apollo/client';
import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

export const chatApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/chat`);

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
