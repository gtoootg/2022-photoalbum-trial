import GoogleMapApi from "../../components/google-map/GoogleMapApi";
import { useContext } from "react";
import {
  categoriesContext,
  flickrImagesContext,
  uploadedPostsContext,
} from "../../pages/_app";
import {
  useGetCategories,
  useGetFlickrImages,
  useGetUploadedPosts,
} from "../home/HomeBody";

export const MapBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  useGetUploadedPosts(setUploadedPosts, uploadedPosts);
  useGetFlickrImages(setFlickrImages, flickrImages);

  const getLocationOfUploadedPosts =
    uploadedPosts &&
    uploadedPosts.map((post) => {
      return {
        lat: post.lat,
        lng: post.lng,
      };
    });

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapApi
        center={{ lat: 0, lng: 0 }}
        zoom={3}
        clusterLocations={
          getLocationOfUploadedPosts ? getLocationOfUploadedPosts : []
        }
      />
    </div>
  );
};
