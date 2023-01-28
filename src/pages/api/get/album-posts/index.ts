import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoAlbumTable } from "../../../../../server/mysql";
import mysql from "mysql";
import {
  getAllFlickrPhotoIdsOfAllPosts,
  getAllPosts,
  getCategoriesWithFlickrImageId,
  jointPostWithFlickrPhotoId,
} from "./albumPosts.helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "njVjyI5CstMQ4VaYl2m1",
    database: "photoalbum",
  });

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
