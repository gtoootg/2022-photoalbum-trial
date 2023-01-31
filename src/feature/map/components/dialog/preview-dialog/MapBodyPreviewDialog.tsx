import { CommonDialog } from "../../../../../components/dialog/CommonDialog";
import {useMapBodyPreviewDialogConfig} from "./MapBodyPreviewDialog.hooks";
import ImageSlider from "../../../../../components/image-slider/ImageSlider";
import {useContext} from "react";
import {filterImageSourcesOfPostForMediaCard} from "../../../../../components/media-card/MediaCardGroup";
import {flickrImagesContext, uploadedPostsContext} from "../../../../../pages/_app";
import {MapBodySelectedUploadedPostIdContext} from "../../../../../pages/map/context-provider/MapBodyContextProvider";

export const MapBodyPreviewDialog = ({ isOpen }) => {

  const {buttonConfig }=useMapBodyPreviewDialogConfig()

  return(
    <CommonDialog
      isOpen={isOpen}
      content={<MapBodyPreviewDialogContent />}
      buttonConfig={buttonConfig}
      maxWidth={'md'}
    />
  )
};


const MapBodyPreviewDialogContent = ()=>{
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);
  const [selectedPostId, setSelectedPostId] = useContext(MapBodySelectedUploadedPostIdContext)

  const uploadedPost =    uploadedPosts?.length && uploadedPosts.find(uploadedPost=>uploadedPost.id === selectedPostId)

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  return (
    <ImageSlider
      imagesSrc={imagesSrc }
    />

  )

}