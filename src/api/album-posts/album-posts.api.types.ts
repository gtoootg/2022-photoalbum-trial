export interface GetAlbumPostResponse {
  id: number;
  title: string;
  description: string;
  country: string;
  lat: number;
  lng: number;
  imageIds: number[];
  categoryIds: number[];
}

export type GetAlbumPostsResponse = GetAlbumPostResponse[];
