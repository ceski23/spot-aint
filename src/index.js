import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';

import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/600.css';
import '@fontsource/josefin-sans/700.css';
import 'styles/global.scss';
import { Provider } from 'react-redux';
import { store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);