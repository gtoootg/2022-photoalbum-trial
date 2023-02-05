import type { NextApiRequest, NextApiResponse } from "next";
import {DataBase} from "../../../../../data-base/database";
import {PhotoAlbumTable} from "../../../../../data-base/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = new DataBase().getDataBaseConnection()

  connection.query(`SELECT * from ${PhotoAlbumTable.COMMON_CATEGORY}`, (error, data) => {
    if (error) {
      throw "error";
    }

    res.json(data);
  });
}
