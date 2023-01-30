import GoogleMapApi from "../../components/google-map/GoogleMapApi";
import { useContext } from "react";
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
import {
  MapBodyOpeningDialogTypeContext,
  MapBodySelectedUploadedPostIdContext
} from "../../pages/map/context-provider/MapBodyContextProvider";

export const MapBody = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  const [selectedPostId, setSelectedPostId] = useContext(MapBodySelectedUploadedPostIdContext)
  const [openingDialogType, setOpeningDialogType] = useContext(MapBodyOpeningDialogTypeContext)

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
      <MapBodyDialogs/>
    </div>
  );
};
