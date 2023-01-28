import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MapBody } from "../../feature/map/MapBody";

export default function Map() {
  return <MapBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "map"])),
    },
  };
}
