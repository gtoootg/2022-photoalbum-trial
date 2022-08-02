import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connection.query("SELECT * FROM uploaded_image_data", (error, data) => {
    if (!error) {
      res.json(data);
      // console.log(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
