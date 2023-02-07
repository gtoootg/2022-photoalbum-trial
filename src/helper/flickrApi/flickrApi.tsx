import axios from "axios";

export interface FlickrImageProps {
  datetaken: string;
  datetakengranularity: number;
  datetakenunknown: string;
  farm: number;
  height_h: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
  url_h: string;
  width_h: number;
}

export async function getFlickrImages() {
  const res2 = await axios.get(`api/flickrImages`);
  const imagesArray = res2.data.photos.photo;
  return imagesArray;
}

export function filterFlickrImagesByUploadDataImageId(
  uploadingDataImageIds: string[],
  flickrImages
): string[] {
  return flickrImages?.filter((flickrImage) =>
    uploadingDataImageIds.includes(flickrImage.id)
  );
}
