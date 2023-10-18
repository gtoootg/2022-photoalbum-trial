import "../styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout heroProps={pageProps.heroProps} header={pageProps.header}>
          <Component />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
