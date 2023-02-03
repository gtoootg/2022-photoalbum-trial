import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MapBody } from "../../feature/map/MapBody";
import {MapBodyContextProvider} from "../../feature/map/MapBodyContextProvider";

export default function Map() {
  return (
  <MapBodyContextProvider>
    <MapBody />
  </MapBodyContextProvider>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "map"])),
    },
  };
}
