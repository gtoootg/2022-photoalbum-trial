import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connection.query("SELECT * FROM post", (error, data) => {
    if (!error) {
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
