import GoogleMapApi from "../../components/google-map/GoogleMapApi";
import { useContext, useState } from "react";
import {
  flickrImagesContext,
  uploadedPostsContext,
} from "../../pages/_app";
import {
  useGetFlickrImages,
  useGetUploadedPosts,
} from "../home/HomeBody";
import {
  MapBodyDialogs,
  MapBodyDialogType,
} from "./components/dialog/MapBodyDialogs";

export const MapBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(
    undefined
  );
  const [openingDialogType, setOpeningDialogType] = useState<
    MapBodyDialogType | undefined
  >(undefined);

  useGetUploadedPosts(setUploadedPosts, uploadedPosts);
  useGetFlickrImages(setFlickrImages, flickrImages);

  const getUrlOfFirstImageOfUploadedPost = (post)=>{
    if(!flickrImages){return undefined}

    return flickrImages.find((flickrImage)=>flickrImage.id === post.flickrPhotoId[0].toString()).url_n
  }

  const getClusterItems =
    uploadedPosts && flickrImages &&
    uploadedPosts.map((post) => {
      return {
        id: post.id,
        lat: post.lat,
        lng: post.lng,
        imageUrl:getUrlOfFirstImageOfUploadedPost(post)
      };
    });

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapApi
        center={{ lat: 0, lng: 0 }}
        zoom={3}
        clusterItems={
          getClusterItems ? getClusterItems : []
        }
        handleClickMarkerOfCluster={(uploadedPostId) => {
          setOpeningDialogType(MapBodyDialogType.PREVIEW_DIALOG);
          setSelectedPostId(uploadedPostId);
        }}
      />
      <MapBodyDialogs dialogType={openingDialogType} />
    </div>
  );
};
