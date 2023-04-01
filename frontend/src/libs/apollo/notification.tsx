import { ApolloProvider } from '@apollo/client';
import { ENDPOINTS } from '~/constants/endpoints';
import createApolloClient from './create-client';

export const notificationApolloClient = createApolloClient(ENDPOINTS.NOTIFICATION_API.ROOT);

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
