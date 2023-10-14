import "../styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout heroProps={pageProps.heroProps} header={pageProps.header}>
        <Component />
      </Layout>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
