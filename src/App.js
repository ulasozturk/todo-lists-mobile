import React from 'react';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { Navigation } from './screens/navigation';
import { Loading } from './screens/loading';

axios.defaults.baseURL = 'https://todo-lists-server.herokuapp.com/api';

export default function App() {
  const theme = store.getState().theme;
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading theme={theme} />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
