import axios from "axios";

// export const apiPath =
// "https://api.flickr.com/services/rest?api_key=3bbbbcbca484db8972d0a979c293030f&method=flickr.photos.search&user_id=135315222@N04&format=json&nojsoncallback=?&extras=url_h,url_n,date_taken,media";

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
  const res2 = await axios.get(`${process.env.API_DEV}/flickrImages`);
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
