import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "njVjyI5CstMQ4VaYl2m1",
    database: "common",
  });

  connection.query("SELECT * from common.category", (error, data) => {
    if (error) {
      throw "error";
    }

    res.json(data);
  });
}
