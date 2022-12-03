import { NextApiRequest, NextApiResponse } from "next";
import { PhotoAlbumTable } from "../../../../../server/mysql";
import mysql from "mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uploadedPostId } = req.query;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "njVjyI5CstMQ4VaYl2m1",
    database: "photoalbum",
  });

  connection.query(
    // `SELECT * from ${PhotoAlbumTable.CATEGORY_ID} where id = ${uploadedPostId}`,
    "SELECT * FROM photoalbum.category_id where postId = 6",
    (error, data) => {
      if (error) {
        throw "error";
      }
      // console.log(res.json(data));
      res.json(data);
    }
  );
}
