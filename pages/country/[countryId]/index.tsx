import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AlbumPostBody from "../../../feature/album-post/AlbumPostBody";
import { CountryBody } from "../../../feature/country/CountryBody";

export default function Country() {
  return <CountryBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "country"])),
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
