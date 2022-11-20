import axios from "axios";
import { useContext, useEffect } from "react";
import { getFlickrImages } from "../../pages/flickrApi";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { MediaCardGroup } from "./components/media-card/MediaCardGroup";

export const HomeBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  useGetUploadedPosts(setUploadedPosts, uploadedPosts);

  useGetFlickrImages(setFlickrImages, flickrImages);

  console.log(uploadedPosts);

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
