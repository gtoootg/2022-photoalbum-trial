import { useContext } from "react";
import {
  flickrImagesContext,
  uploadedPostsContext,
} from "../../pages/_app";
import {
  useGetFlickrImages,
  useGetUploadedPosts,
} from "../home/HomeBody";
import { useRouter } from "next/router";
import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";

export const CountryBody = () => {
  const router = useRouter();

  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  useGetUploadedPosts(setUploadedPosts, uploadedPosts);
  useGetFlickrImages(setFlickrImages, flickrImages);

  const { countryId } = router.query;

  const uploadedPostOFCurrentCountry =
    uploadedPosts &&
    uploadedPosts.filter((uploadedPost) => uploadedPost.country === countryId);

  if (!uploadedPosts) {
    return <></>;
  }

  return (
    <>
      <MediaCardGroup
        flickrImages={flickrImages}
        uploadedPosts={uploadedPostOFCurrentCountry}
        uniqueId={'id'}
      />
    </>
  );
};
