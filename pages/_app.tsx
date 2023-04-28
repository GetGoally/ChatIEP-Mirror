import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { AppContextProvider } from '@/utils/context/AppContext';
import { ChatContextProvider } from '@/utils/context/ChatContext';

import Header from '@/components/Goally/Layout/Header';

import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <AppContextProvider>
      <ChatContextProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 pt-[100px] lg:pt-[130px]">
              <Component {...pageProps} />
            </main>
          </div>
        </QueryClientProvider>
      </ChatContextProvider>
    </AppContextProvider>
  );
}

export default appWithTranslation(App);
