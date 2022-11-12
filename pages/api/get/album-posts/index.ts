import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../../../server/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfFlickrPhotoIdOfAllPosts;
  let responseOfAllPosts;

  const getAllFlickrPhotoIdsOfAllPosts = new Promise((resolve, reject) => {
    connection.query(
      "SELECT * from photoalbum.flickr_photo_id",
      (error, data) => {
        if (error) {
          return reject(error);
        }

        responseOfFlickrPhotoIdOfAllPosts = data;
        resolve(responseOfFlickrPhotoIdOfAllPosts);
      }
    );
  });

  const getAllPosts = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM photoalbum.post", (error, data) => {
      if (error) {
        reject(error);
      }
      responseOfAllPosts = data;
      resolve(responseOfAllPosts);
    });
  });

  Promise.all([getAllFlickrPhotoIdsOfAllPosts, getAllPosts]).then(() => {
    res.json(
      jointPostWithFlickrPhotoId(
        responseOfAllPosts,
        responseOfFlickrPhotoIdOfAllPosts
      )
    );
  });
}

const filterFlickrPhotoIdByPostId = (responseOfFlickrPhotoIdOfAllPosts) =>
  responseOfFlickrPhotoIdOfAllPosts.reduce(
    (groupingObjectOfFlickrPhotoIdByPostId, flickrPhotoIdOfPost) => {
      let updatedGroupingObjectOfFlickrPhotoIdByPostId: {
        [key: number]: number;
      } = groupingObjectOfFlickrPhotoIdByPostId;

      const addFlickrPhotoIdToPostIdGroup =
        groupingObjectOfFlickrPhotoIdByPostId[flickrPhotoIdOfPost.postId] ===
        undefined
          ? []
          : groupingObjectOfFlickrPhotoIdByPostId[flickrPhotoIdOfPost.postId];

      addFlickrPhotoIdToPostIdGroup.push(flickrPhotoIdOfPost.flickrPhotoId);

      updatedGroupingObjectOfFlickrPhotoIdByPostId = {
        ...updatedGroupingObjectOfFlickrPhotoIdByPostId,
        [flickrPhotoIdOfPost.postId]: addFlickrPhotoIdToPostIdGroup,
      };
      return updatedGroupingObjectOfFlickrPhotoIdByPostId;
    },
    {}
  );

const jointPostWithFlickrPhotoId = (
  responseOfAllPosts,
  responseOfFlickrPhotoIdOfAllPosts
) =>
  responseOfAllPosts.map((responseOfPost) => {
    const arrayOfFlickrPhotoId = filterFlickrPhotoIdByPostId(
      responseOfFlickrPhotoIdOfAllPosts
    )[responseOfPost.id];
    return { ...responseOfPost, flickrPhotoId: arrayOfFlickrPhotoId };
  });
