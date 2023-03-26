import { GlobalLoading } from '@cads-ui/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import ApolloClientConfig from './components/config/ApolloClientConfig';
import ThemeConfig from './components/config/ThemeConfig';
import ServerErrorPage from './components/feedback/ServerErrorPage';
import LoadingScreen from './components/LoadingScreen';
import Page from './components/Page';
import store from './libs/redux/store';
import router from './routes/router';

// -----------------------------
function App() {
  return (
    <ApolloClientConfig>
      <ThemeConfig>
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={ServerErrorPage}>
            <GlobalLoading colors={['#0066cf', '#019bfd', '#44befc']} />
            <Page>
              <Suspense fallback={<LoadingScreen />}>
                <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
              </Suspense>
            </Page>
          </ErrorBoundary>
        </Provider>
      </ThemeConfig>
    </ApolloClientConfig>
  );
}

export default App;
