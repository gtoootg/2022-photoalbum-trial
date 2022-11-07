import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFlickrImages } from "./flickrApi";
import { uploadedPostsContext, flickrImagesContext } from "./_app";
import { HomeBody } from "../feature/home/home-body";

const Home: NextPage = () => {
  // const getAlbumPostsWithFlickId = async () => {
  //   const albumPosts = await axios
  //     .get("/api/get/album-posts")
  //     .then((res) => res.data);
  //   const flickrPhotoIdOfAlbumPosts = await axios
  //     .get("/api/get/flickr-photo-id")
  //     .then((res) => res.data);

  //   if (albumPosts && flickrPhotoIdOfAlbumPosts) {
  //     const newArray = albumPosts.map((albumPost) => {
  //       const arrayOfFlickrPhotoIdForAlbumPost =
  //         flickrPhotoIdOfAlbumPosts.filter((flickrPhotoIdOfAlbumPost) => {
  //           return albumPost.id === flickrPhotoIdOfAlbumPost.postId;
  //         });

  //       albumPost.flickrPhotoId = arrayOfFlickrPhotoIdForAlbumPost;
  //     });
  //     return newArray;
  //   }
  // };

  return <HomeBody />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
