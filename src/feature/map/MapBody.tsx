"use client";

import GoogleMapApi from "../../components/google-map/GoogleMapApi";

import { useGetAlbumPostsSelector } from "../../api/album-posts/use-get-album-posts.hooks";
import { useMapSelectedPostId } from "./state/use-map-selected-post-id.reactive-vars";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { MapBodyPreviewDialog } from "./components/dialog/preview-dialog/MapBodyPreviewDialog";
import { useQueryClient } from "react-query";

export const MapBody = () => {
  const { data: flickrImages } = useFlickrImages();
  const getAlbumPostsSelector = useGetAlbumPostsSelector();
  const [selectedPostId, setSelectedPostId] = useMapSelectedPostId();

  const getUrlOfFirstImageOfUploadedPost = (post) => {
    if (!flickrImages) {
      return undefined;
    }

    return flickrImages.find(
      (flickrImage) => flickrImage.id === post.imageIds[0].toString()
    ).url_n;
  };

  const getClusterItems =
    getAlbumPostsSelector?.data &&
    flickrImages &&
    getAlbumPostsSelector.data.map((post) => {
      return {
        id: post.id,
        lat: post.lat,
        lng: post.lng,
        imageUrl: getUrlOfFirstImageOfUploadedPost(post),
      };
    });

  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <GoogleMapApi
        center={{ lat: 0, lng: 0 }}
        zoom={3}
        clusterItems={getClusterItems ? getClusterItems : []}
        handleClickMarkerOfCluster={(uploadedPostId) => {
          setSelectedPostId(uploadedPostId);
        }}
      />
      {selectedPostId && <MapBodyPreviewDialog />}
    </div>
  );
};
