import Flickr from "flickr-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const flickr = new Flickr("3bbbbcbca484db8972d0a979c293030f");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  flickr.people
    .getPhotos({
      user_id: "135315222@N04",
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
