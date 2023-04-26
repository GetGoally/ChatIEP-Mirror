import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { LayoutContextProvider } from '@/utils/context/LayoutContext';

import Header from '@/components/Layout/Header';

import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <LayoutContextProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </QueryClientProvider>
    </LayoutContextProvider>
  );
}

export default appWithTranslation(App);
