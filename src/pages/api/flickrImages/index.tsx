import Flickr from "flickr-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const flickr = new Flickr(process.env.FLICKR_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  flickr.people
    .getPhotos({
      user_id: process.env.FLICKR_USER_ID,
      extras: ["url_h", "url_n"],
      per_page: 500,
    })
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      console.log(error);
    });
}
