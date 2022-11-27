import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9ZmL08RDk3Kf9nei5sJg",
    database: "photoalbum",
  });

  connection.query("SELECT * from common.category", (error, data) => {
    if (error) {
      throw "error";
    }

    res.json(data);
  });
}
