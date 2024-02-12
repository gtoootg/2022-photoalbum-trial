import { Box } from "@mui/material";
import Image from "next/image";
import { useSetUploadingImages } from "../stepper/first-stepper/hooks/use-set-uploading-images.hooks";
import { useUploadingImages } from "../../state/use-upload-data.reactive-vars";
import { useFlickrImages } from "../../../../api/flickr-images/use-get-flickr-images.hooks";
import { ImageListBoxStyled, ImageListItemStyled } from "./ImageListBox.styled";

export default function ImageListBox() {
  const { data: flickrImages } = useFlickrImages();
  const [uploadingImages] = useUploadingImages();
  const setUploadingImages = useSetUploadingImages();

  return (
    <Box>
      <ImageListBoxStyled cols={3}>
        {(flickrImages || []).map(({ id, url_n }, i) => (
          <ImageListItemStyled
            key={i}
            isSelected={uploadingImages.includes(id)}
          >
            <Image
              onClick={() => setUploadingImages(id)}
              src={url_n}
              alt={"image"}
              layout={"fill"}
            />
          </ImageListItemStyled>
        ))}
      </ImageListBoxStyled>
    </Box>
  );
}
