import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query =
    "INSERT INTO post (title, description, country, category, lat, lng) VALUES (?,?,?,?,?,?);";

  const requestBody = [
    req.body.title,
    req.body.description,
    req.body.country,
    req.body.category,
    req.body.lat,
    req.body.lng,
  ];

  connection.query(query, requestBody, (error, data) => {
    if (!error) {
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
