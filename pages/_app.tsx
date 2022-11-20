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
export const categoriesContext = createContext([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [flickrImages, setFlickrImages] = useState(undefined);
  const [uploadedPosts, setUploadedPosts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);

  return (
    <flickrImagesContext.Provider value={[flickrImages, setFlickrImages]}>
      <uploadedPostsContext.Provider value={[uploadedPosts, setUploadedPosts]}>
        <categoriesContext.Provider value={[categories, setCategories]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </categoriesContext.Provider>
      </uploadedPostsContext.Provider>
    </flickrImagesContext.Provider>
  );
}

export default appWithTranslation(MyApp);
