import { useRouter } from "next/router";
import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";

export const CountryBody = () => {
  const router = useRouter();

  const { data: uploadedPosts } = useGetUploadedPosts();
  const { data: flickrImages } = useFlickrImages();

  const { countryId } = router.query;

  const uploadedPostOFCurrentCountry = uploadedPosts?.filter(
    (uploadedPost) => uploadedPost.country === countryId
  );

  return (
    <MediaCardGroup
      flickrImages={flickrImages}
      uniqueId={"id"}
      uploadedPosts={uploadedPostOFCurrentCountry}
    />
  );
};
