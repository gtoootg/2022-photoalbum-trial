import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connection.query("SELECT LAST_INSERT_ID()", (error, data) => {
    if (!error) {
      console.log(data);
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
