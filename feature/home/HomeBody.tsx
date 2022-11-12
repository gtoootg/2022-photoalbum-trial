import axios from "axios";
import { useContext, useEffect } from "react";
import { getFlickrImages } from "../../pages/flickrApi";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { MediaCardGroup } from "./components/media-card/MediaCardGroup";

export const HomeBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  useGetUploadedPosts(setUploadedPosts);

  useGetFlickrImages(setFlickrImages);

  return (
    <>
      <MediaCardGroup />
    </>
  );
};

export const useGetFlickrImages = (setFlickrImages) => {
  useEffect(() => {
    const handleGetFlickrImages = async () => {
      const res = await getFlickrImages();
      setFlickrImages(res);
    };

    handleGetFlickrImages();
  }, []);
};

const useGetUploadedPosts = (setUploadedPosts) => {
  useEffect(() => {
    const getUploadedPosts = async () => {
      const res = await axios.get("/api/get/album-posts");

      setUploadedPosts(res.data);
    };
    getUploadedPosts();
  }, []);
};
