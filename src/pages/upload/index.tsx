import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UploadBody from "../../feature/upload/UploadBody";

export default function Upload() {
  return <UploadBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "upload"])),
    },
  };
}
