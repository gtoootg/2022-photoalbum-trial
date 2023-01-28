export interface UploadingDataProps {
  flickrImageIds: string[];
  title: string;
  description: string;
  country: string;
  categories: UploadingDataCategoryProps;
  lat: number;
  lng: number;
}

interface UploadingDataCategoryProps {
  [key: string]: number[];
}
