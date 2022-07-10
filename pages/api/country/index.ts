import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connection.query(
    "INSERT INTO `heroku_cd8e62582467f27`.`new_table` (`name`, `capital`) VALUES (?,?);",
    [req.body.name, req.body.capital],
    (error, data) => {
      if (!error) {
        res.json(data);
      }
      if (error) {
        console.log(error);
      }
    }
  );
}
