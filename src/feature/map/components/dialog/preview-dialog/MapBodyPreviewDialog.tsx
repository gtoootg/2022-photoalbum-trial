import { CommonDialog } from "../../../../../components/dialog/CommonDialog";
import { useMapBodyPreviewDialogConfig } from "./MapBodyPreviewDialog.hooks";
import ImageSlider from "../../../../../components/image-slider/ImageSlider";
import { filterImageSourcesOfPostForMediaCard } from "../../../../../components/media-card/MediaCardGroup";

import { useFlickrImages } from "../../../../../api/flickr-images/use-get-flickr-images.hooks";
import { useGetAlbumPosts } from "../../../../../api/album-posts/use-get-album-posts.hooks";
import { useMapSelectedPostId } from "../../../state/use-map-selected-post-id.reactive-vars";

export const MapBodyPreviewDialog = () => {
  const { buttonConfig } = useMapBodyPreviewDialogConfig();

  return (
    <CommonDialog
      isOpen={true}
      content={<MapBodyPreviewDialogContent />}
      buttonConfig={buttonConfig}
      maxWidth={"md"}
    />
  );
};

const MapBodyPreviewDialogContent = () => {
  const { data: flickrImages } = useFlickrImages();
  const { data: uploadedPosts } = useGetAlbumPosts();

  const [selectedPostId] = useMapSelectedPostId();

  const uploadedPost =
    uploadedPosts?.length &&
    uploadedPosts.find((uploadedPost) => uploadedPost.id === selectedPostId);

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  return <ImageSlider imagesSrc={imagesSrc} />;
};
