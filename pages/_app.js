import '../styles/globals.css';
import { ThirdwebProvider } from '@3rdweb/react';
import { store } from '../app/store';
import { Provider } from 'react-redux';

const supportedChainIds = [4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
