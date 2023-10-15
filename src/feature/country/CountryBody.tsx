import { useContext } from "react";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { useFlickrImages, useGetUploadedPosts } from "../home/HomeBody";
import { useRouter } from "next/router";
import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";

export const CountryBody = () => {
  const router = useRouter();

  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  // const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  const { data: uploadedPosts } = useGetUploadedPosts();

  useGetFlickrImages(setFlickrImages, flickrImages);

  const { countryId } = router.query;

  const uploadedPostOFCurrentCountry = uploadedPosts?.filter(
    (uploadedPost) => uploadedPost.country === countryId
  );

  return (
    <>
      <MediaCardGroup
        flickrImages={flickrImages}
        uniqueId={"id"}
        uploadedPosts={uploadedPostOFCurrentCountry}
      />
    </>
  );
};
