import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HomeBody } from "../feature/home/HomeBody";

const Home = () => {
  return <HomeBody />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      heroProps: {
        imageGroupForTransition: [
          "https://live.staticflickr.com/65535/51973839886_56f413f231_h.jpg",
          "https://live.staticflickr.com/65535/49802283783_5ab06de39c_k.jpg",
          "https://live.staticflickr.com/593/33022311841_93724faf1f_k.jpg",
          "https://live.staticflickr.com/2056/32128238004_e82f7c7a55_k.jpg",
        ],
        title: "hello",
        caption: "hello",
      },
    },
  };
}
