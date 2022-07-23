import axios from "axios";

export const apiPath =
  "https://api.flickr.com/services/rest?api_key=3bbbbcbca484db8972d0a979c293030f&method=flickr.photos.search&user_id=135315222@N04&format=json&nojsoncallback=?&extras=url_h,date_taken";

export interface FlickrImagesProps {
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
  const res = await axios.get(apiPath);
  const imagesArray = res.data.photos.photo;
  return imagesArray;
}

export async function getFlickrPhotoByID(
  flickrPhotoID0: string,
  flickrPhotoID1: string,
  flickrPhotoID2: string,
  flickrPhotoID3: string,
  flickrPhotoID4: string
) {
  const res = await axios.get(apiPath);
  const photosArray = res.data.photos.photo;
  const filterPhotoByID = photosArray.filter(function (
    photo: FlickrImagesProps
  ) {
    return (
      photo.id === flickrPhotoID0 ||
      photo.id === flickrPhotoID1 ||
      photo.id === flickrPhotoID2 ||
      photo.id === flickrPhotoID3 ||
      photo.id === flickrPhotoID4
    );
  });

  return filterPhotoByID;
}
