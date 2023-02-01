import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql";
import {DataBase} from "../../../../../../server/data-base/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = new DataBase().getDataBaseConnection()

  connection.query("SELECT * from common.category", (error, data) => {
    if (error) {
      throw "error";
    }

    res.json(data);
  });
}
