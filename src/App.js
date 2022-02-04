import React from 'react';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { Navigation } from './screens/navigation';

axios.defaults.baseURL = 'https://todo-lists-server.herokuapp.com/api';

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = store.getState().theme;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
