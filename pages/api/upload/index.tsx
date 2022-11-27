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

  let lastInsertIdOfPostTable;
  let dataOfFlickrPhotoIdTableWherePostIdIsLatest;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9ZmL08RDk3Kf9nei5sJg",
    database: "photoalbum",
  });

  await uploadPost(connection, req).then((res) => {
    responseOfUploadPost = res;
  }),
    await getLastInsertId(connection).then((res) => {
      lastInsertIdOfPostTable = res;
    }),
    await uploadFlickrPhotoIdAndPostId(
      connection,
      req,
      lastInsertIdOfPostTable
    ).then((res) => {
      responseOfUploadFlickrPhotoId = res;
    }),
    await getDataFromFlickrPhotoIdTableWherePostIdIsLatest(
      connection,
      lastInsertIdOfPostTable
    ).then((res) => {
      dataOfFlickrPhotoIdTableWherePostIdIsLatest = res;
    });
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
