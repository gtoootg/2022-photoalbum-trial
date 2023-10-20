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
  url_n: string;
  width_h: number;
}

export interface GetExifDataResponse {
  photo: {
    id: string;
    secret: string;
    server: string;
    fam: number;
    camera: string;
    exif: {
      tagspace: string;
      tagspaceid: number;
      tag: string;
      label: string;
      raw: {
        _content: string;
      };
    }[];
  };
  stat: string;
}

export interface ExifData {
  camera: string;
  fNumber: string;
  exposure: string;
  focalLength: string;
  iso: string;
}
