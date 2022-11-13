import Flickr from "flickr-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const flickr = new Flickr("3bbbbcbca484db8972d0a979c293030f");

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
