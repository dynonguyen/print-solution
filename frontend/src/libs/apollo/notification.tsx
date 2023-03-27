import { ApolloProvider } from '@apollo/client';
import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

export const notificationApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/notification`);

const NotificationApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={notificationApolloClient}>{children}</ApolloProvider>;
};

export function withNotificationApolloProvider<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <NotificationApolloProvider>
      <Component {...props} />
    </NotificationApolloProvider>
  );
}

export default NotificationApolloProvider;
