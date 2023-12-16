import { NextApiRequest, NextApiResponse } from "next";
import Flickr from "flickr-sdk";

const flickr = new Flickr(process.env.FLICKR_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { flickrPhotoId } = req.query;

  flickr.photos
    .getExif({ photo_id: flickrPhotoId })
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      console.log(error);
    });
}
