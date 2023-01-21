import "/styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { getLayout } from "../components/layout/Layout";

import { createContext, useState } from "react";

export const flickrImagesContext = createContext([]);
export const uploadedPostsContext = createContext([]);
export const categoriesContext = createContext([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [flickrImages, setFlickrImages] = useState(undefined);
  const [uploadedPosts, setUploadedPosts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);

  return getLayout(
    <flickrImagesContext.Provider value={[flickrImages, setFlickrImages]}>
      <uploadedPostsContext.Provider value={[uploadedPosts, setUploadedPosts]}>
        <categoriesContext.Provider value={[categories, setCategories]}>
          <Component {...pageProps} />
        </categoriesContext.Provider>
      </uploadedPostsContext.Provider>
    </flickrImagesContext.Provider>,
    pageProps
  );
}

export default appWithTranslation(MyApp);
