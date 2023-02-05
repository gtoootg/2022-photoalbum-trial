import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllFlickrPhotoIdsOfAllPosts,
  getAllPosts,
  getCategoriesWithFlickrImageId,
  jointPostWithFlickrPhotoId,
} from "./albumPosts.helper";
import {DataBase} from "../../../../data-base/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = new DataBase().getDataBaseConnection()

  const uploadedPosts = await getAllPosts(connection);
  const flickrImageIdsOfUploadedPosts = await getAllFlickrPhotoIdsOfAllPosts(
    connection
  );
  const categoriesOfAllPosts = await getCategoriesWithFlickrImageId(connection);

  res.json(
    jointPostWithFlickrPhotoId(
      uploadedPosts,
      flickrImageIdsOfUploadedPosts,
      categoriesOfAllPosts
    )
  );
}
