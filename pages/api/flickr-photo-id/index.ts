import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, flickrPhotoIds } = req.body;

  const buildSqlQuery = () => {
    let query = (insertValues: string) =>
      `INSERT INTO flickr_photo_id (flickrPhotoId, postId) VALUES ${insertValues}`;

    const insertValues: string = flickrPhotoIds
      .map((flickrPhotoId) => {
        return `(${flickrPhotoId}, ${postId})`;
      })
      .join(", ");

    return query(insertValues);
  };

  connection.query(buildSqlQuery(), (error, data) => {
    if (!error) {
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
