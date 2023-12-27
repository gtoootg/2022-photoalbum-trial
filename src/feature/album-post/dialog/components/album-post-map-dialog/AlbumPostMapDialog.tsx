import { MgDialog } from "../../../../../components/dialog/MgDialog";
import styles from "./AlbumPostMapDialog.module.scss";
import { AlbumPostMap } from "../../../components/category-and-map/components/map/AlbumPostMap";
import { GetAlbumPostResponse } from "../../../../../api/album-posts/album-posts.api.types";

export const AlbumPostMapDialog = ({
  isOpen,
  uploadedPost,
}: {
  isOpen: boolean;
  uploadedPost: GetAlbumPostResponse;
}) => {
  return (
    <MgDialog
      isOpen={isOpen}
      content={
        <AlbumPostMap uploadedPost={uploadedPost} className={styles.map} />
      }
      maxWidth={"md"}
    />
  );
};
