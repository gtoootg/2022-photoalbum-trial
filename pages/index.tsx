import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFlickrImages } from "./flickrApi";
import { uploadedPostsContext, flickrImagesContext } from "./_app";
import MediaCard from "../components/media-card/MediaCard";

const Home: NextPage = () => {
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  function getFlickrPhotoID() {
    axios.get("/api/get/flickr-photo-id").then((res) => {
      console.log(res.data);
    });
  }

  const getAlbumPostsWithFlickId = async () => {
    const albumPosts = await axios
      .get("/api/get/album-posts")
      .then((res) => res.data);
    const flickrPhotoIdOfAlbumPosts = await axios
      .get("/api/get/flickr-photo-id")
      .then((res) => res.data);

    if (albumPosts && flickrPhotoIdOfAlbumPosts) {
      const newArray = albumPosts.map((albumPost) => {
        const arrayOfFlickrPhotoIdForAlbumPost =
          flickrPhotoIdOfAlbumPosts.filter((flickrPhotoIdOfAlbumPost) => {
            return albumPost.id === flickrPhotoIdOfAlbumPost.postId;
          });

        albumPost.flickrPhotoId = arrayOfFlickrPhotoIdForAlbumPost;
      });
      return newArray;
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = axios.get("/api/get/album-posts");
      return res;
    };

    axios.get("/api/get/album-posts").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <></>;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
