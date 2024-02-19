export interface GetAlbumPostResponse {
  id: number;
  title: string;
  description: string;
  country: string;
  lat: number;
  lng: number;
  imageIds: number[];
  categoryIds: Record<number, number[]>;
}

export type GetAlbumPostsResponse = GetAlbumPostResponse[];

export interface UploadAlbumPostRequest {
  userId:number
  title: string;
  description: string;
  country: string;
  lat: number;
  lng: number;
  imageIds: string[];
  categoryIds: Record<number, string[]>;
}

export interface UpdateAlbumPostRequest {
  id: number;
  title?: string;
  description?: string;
}
