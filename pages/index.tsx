import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HomeBody } from "../feature/home/HomeBody";

const Home: NextPage = () => {
  return <HomeBody />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      pageProps: {
        heroProps: {
          imageGroupForTransition: [
            "https://live.staticflickr.com/65535/51973840381_5d45d75595_h.jpg",
            "https://live.staticflickr.com/65535/51973839886_56f413f231_h.jpg",
          ],
          image:
            "https://live.staticflickr.com/65535/51973839886_56f413f231_h.jpg",
          title: "hello",
          caption: "hello",
        },
      },
    },
  };
}
