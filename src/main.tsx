import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

// Local imports
import { store, persistor } from './store/store';
import { ThemeWrapper, App } from './components';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </PersistGate>
  </Provider>,
);
