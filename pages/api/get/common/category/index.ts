import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../../../server/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connection.query("SELECT * from common.category", (error, data) => {
    if (error) {
      throw "error";
    }

    res.json(data);
  });
}
