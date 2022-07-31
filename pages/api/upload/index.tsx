import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../server/mysql";

export default function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query =
    "INSERT INTO `heroku_cd8e62582467f27`.`uploaded_image_data` (`flickr_image_id_0`, `flickr_image_id_1`,`flickr_image_id_2`,`flickr_image_id_3`,`flickr_image_id_4`,`title`, `description`,`country`,`category`,`lat`,`lng`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

  const requestBody = [
    req.body.flickr_image_id[0],
    req.body.flickr_image_id[1] ? req.body.flickr_image_id[1] : null,
    req.body.flickr_image_id[2] ? req.body.flickr_image_id[2] : null,
    req.body.flickr_image_id[3] ? req.body.flickr_image_id[3] : null,
    req.body.flickr_image_id[4] ? req.body.flickr_image_id[4] : null,
    req.body.title,
    req.body.description,
    req.body.country,
    req.body.category,
    req.body.lat,
    req.body.lng,
  ];

  console.log(req.body.flickr_image_id);
  connection.query(query, requestBody, (error, data) => {
    if (!error) {
      res.json(data);
    }
    if (error) {
      console.log(error);
    }
  });
}
