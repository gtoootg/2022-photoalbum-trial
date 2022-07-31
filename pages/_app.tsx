import "/styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

import { createContext, useState } from "react";

export const flickrImagesContext = createContext([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [flickrImages, setFlickrImages] = useState([]);

  return (
    <flickrImagesContext.Provider value={[flickrImages, setFlickrImages]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </flickrImagesContext.Provider>
  );
}

export default appWithTranslation(MyApp);
