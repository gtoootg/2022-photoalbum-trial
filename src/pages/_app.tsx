import "../styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { MgSnackbar } from "../components/snackbar/MgSnackbar";
import { createTheme } from "@mui/material/styles";
import { palette } from "../app/palette";
import { ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const theme = createTheme({ palette });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout heroProps={pageProps.heroProps} header={pageProps.header}>
            <MgSnackbar />
            <Component />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
      //{" "}
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
