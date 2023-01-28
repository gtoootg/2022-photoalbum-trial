import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDataFromFlickrPhotoIdTableWherePostIdIsLatest,
  getLastInsertId,
  insertIntoCategoryTable,
  uploadFlickrPhotoIdAndPostId,
  uploadPost,
} from "./uploadHelper";
import mysql from "mysql";

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfUploadPost;

  let responseOfUploadFlickrPhotoId;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "njVjyI5CstMQ4VaYl2m1",
    database: "photoalbum",
  });

  await uploadPost(connection, req).then((res) => {
    responseOfUploadPost = res;
  });

  const lastInsertIdOfPostTable = await getLastInsertId(connection);

  await uploadFlickrPhotoIdAndPostId(
    connection,
    req,
    lastInsertIdOfPostTable
  ).then((res) => {
    responseOfUploadFlickrPhotoId = res;
  });

  const dataOfFlickrPhotoIdTableWherePostIdIsLatest =
    await getDataFromFlickrPhotoIdTableWherePostIdIsLatest(
      connection,
      lastInsertIdOfPostTable
    );

  insertIntoCategoryTable(
    connection,
    req,
    dataOfFlickrPhotoIdTableWherePostIdIsLatest
  );

  res.json({
    post: responseOfUploadPost,
    flickrPhotoId: responseOfUploadFlickrPhotoId,
  });
}
