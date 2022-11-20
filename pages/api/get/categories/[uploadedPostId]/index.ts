import { NextApiRequest, NextApiResponse } from "next";
import { connection, PhotoAlbumTable } from "../../../../../server/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uploadedPostId } = req.query;

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
