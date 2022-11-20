import axios from "axios";
import { useContext, useEffect } from "react";
import { getFlickrImages } from "../../pages/flickrApi";
import {
  categoriesContext,
  flickrImagesContext,
  uploadedPostsContext,
} from "../../pages/_app";
import { MediaCardGroup } from "./components/media-card/MediaCardGroup";

export const HomeBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);
  const [categories, setCategories] = useContext(categoriesContext);

  useGetUploadedPosts(setUploadedPosts, uploadedPosts);

  useGetFlickrImages(setFlickrImages, flickrImages);

  useGetCategories(categories, setCategories);

  return (
    <>
      <MediaCardGroup />
    </>
  );
};

export const useGetFlickrImages = (setFlickrImages, flickrImages) => {
  useEffect(() => {
    const handleGetFlickrImages = async () => {
      const res = await getFlickrImages();
      setFlickrImages(res);
    };

    if (flickrImages) {
      return;
    }

    handleGetFlickrImages();
  }, []);
};

export const useGetUploadedPosts = (setUploadedPosts, uploadedPosts) => {
  useEffect(() => {
    const getUploadedPosts = async () => {
      const res = await axios.get("/api/get/album-posts");

      setUploadedPosts(res.data);
    };
    if (uploadedPosts) {
      return;
    }
    getUploadedPosts();
  }, []);
};

export const useGetCategories = (categories, setCategories) => {
  useEffect(() => {
    if (categories) {
      return;
    }
    axios.get("api/get/common/category").then((res) => {
      const getCategoriesForSelectField = res.data.map((category) => {
        return {
          value: category.id,
          label: category.label,
        };
      });

      setCategories(getCategoriesForSelectField);
    });
  }, []);
};
