import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFlickrImages } from "./flickrApi";
import { uploadedPostsContext, flickrImagesContext } from "./_app";
import { HomeBody } from "../feature/home/HomeBody";

const Home: NextPage = () => {
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
