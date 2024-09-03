import { Header } from './Components/Header/Header';

import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import { PersistGate } from 'redux-persist/es/integration/react';
import Footer from './Components/Footer/Footer';
import { persistor, store } from './store';

export const Layout = () => {
  return (
    <>
      {' '}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Outlet />
        </PersistGate>
        <Footer />
      </Provider>
    </>
  );
};
