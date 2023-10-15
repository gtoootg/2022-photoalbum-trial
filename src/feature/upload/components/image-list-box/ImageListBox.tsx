import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import styles from "./ImageListBox.module.scss";
import { useSetUploadingImages } from "../stepper/first-stepper/hooks/use-set-uploading-images.hooks";
import { useUploadingImages } from "../../state/use-upload-data.reactive-vars";
import { useFlickrImages } from "../../../../api/flickr-images/use-get-flickr-images.hooks";

export default function ImageListBox() {
  const { data: flickrImages } = useFlickrImages();
  const [uploadingImages] = useUploadingImages();
  const setUploadingImages = useSetUploadingImages();

  const getImageOpacity = (id: string) => {
    if (uploadingImages.includes(id)) {
      return "1";
    }
    return "0.6";
  };

  return (
    <Box className={styles.box}>
      <ImageList className={styles.box_imageList} cols={3}>
        {(flickrImages || []).map(({ id, url_n }, i) => (
          <ImageListItem key={i}>
            <Box
              className={styles.box_imageList_item}
              style={{
                opacity: getImageOpacity(id),
              }}
            >
              <Image
                onClick={() => setUploadingImages(id)}
                src={url_n}
                height={200}
                width={300}
                alt={"image"}
              />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
