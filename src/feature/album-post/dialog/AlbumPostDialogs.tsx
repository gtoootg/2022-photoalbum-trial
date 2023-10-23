import { AlbumPostMapDialog } from "./components/album-post-map-dialog/AlbumPostMapDialog";
import { GetAlbumPostResponse } from "../../../api/album-posts/album-posts.api.types";

export enum AlbumPostDialogsType {
  MAP,
}

export const AlbumPostDialogs = ({
  uploadedPost,
}: {
  uploadedPost: GetAlbumPostResponse;
}) => {
  return (
    <>
      <AlbumPostMapDialog isOpen={false} uploadedPost={uploadedPost} />
    </>
  );
};
