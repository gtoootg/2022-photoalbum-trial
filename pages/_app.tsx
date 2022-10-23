import axios from "axios";
import "/styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

import { createContext, useState } from "react";
import { useEffect } from "react";
import { getFlickrImages } from "./flickrApi";

export const flickrImagesContext = createContext([]);
export const uploadedPostsContext = createContext([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [flickrImages, setFlickrImages] = useState([]);
  const [posts, setPosts] = useState([]);

  return (
    <flickrImagesContext.Provider value={[flickrImages, setFlickrImages]}>
      <uploadedPostsContext.Provider value={[flickrImages, setFlickrImages]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </uploadedPostsContext.Provider>
    </flickrImagesContext.Provider>
  );
}

export default appWithTranslation(MyApp);
