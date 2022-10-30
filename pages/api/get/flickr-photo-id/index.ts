import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connection.query("SELECT * FROM flickr_photo_id", (error, data) => {
    if (!error) {
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
