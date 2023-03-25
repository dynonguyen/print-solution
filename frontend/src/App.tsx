import { GlobalLoading } from '@cads-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import ServerErrorPage from './components/feedback/ServerErrorPage';
import LoadingScreen from './components/LoadingScreen';
import Page from './components/Page';
import ThemeConfig from './components/ThemeConfig';
import store from './libs/redux/store';
import router from './routes/router';

function App() {
  return (
    <Page>
      <ThemeConfig>
        <ErrorBoundary FallbackComponent={ServerErrorPage}>
          <GlobalLoading />
          <Provider store={store}>
            <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
          </Provider>
        </ErrorBoundary>
      </ThemeConfig>
    </Page>
  );
}

export default App;
