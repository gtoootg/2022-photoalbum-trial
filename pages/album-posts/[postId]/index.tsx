import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import AlbumPostBody from "../../../feature/album-post/AlbumPostBody";

export default function AlbumPostWithId() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <>
      <AlbumPostBody />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "album-post"])),
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
