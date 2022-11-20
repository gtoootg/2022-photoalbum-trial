import type { NextApiRequest, NextApiResponse } from "next";
import { connection, PhotoAlbumTable } from "../../../../server/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfFlickrPhotoIdOfAllPosts;
  let responseOfAllPosts;
  let responseOfCategoryIdOfAllPosts;

  const getAllFlickrPhotoIdsOfAllPosts = new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${PhotoAlbumTable.FLICKR_PHOTO_ID}`,
      (error, data) => {
        if (error) {
          return reject(error);
        }

        responseOfFlickrPhotoIdOfAllPosts = data;
        resolve(responseOfFlickrPhotoIdOfAllPosts);
      }
    );
  });

  const getAllCategoryIdOfAllUpdatedPosts = new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${PhotoAlbumTable.CATEGORY_ID}`,
      (error, data) => {
        if (error) {
          return reject(error);
        }

        responseOfCategoryIdOfAllPosts = data;
        resolve(responseOfCategoryIdOfAllPosts);
      }
    );
  });

  const getAllPosts = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${PhotoAlbumTable.POST}`, (error, data) => {
      if (error) {
        reject(error);
      }
      responseOfAllPosts = data;
      resolve(responseOfAllPosts);
    });
  });

  Promise.all([
    getAllFlickrPhotoIdsOfAllPosts,
    getAllCategoryIdOfAllUpdatedPosts,
    getAllPosts,
  ]).then(() => {
    res.json(
      jointPostWithFlickrPhotoId(
        responseOfAllPosts,
        responseOfFlickrPhotoIdOfAllPosts,
        responseOfCategoryIdOfAllPosts
      )
    );
  });
}

const composeArrayOfIdToJointToUploadedPosts = (responseOfDataTable, keyId) =>
  responseOfDataTable.reduce((groupingByPostId, tableRow) => {
    let updatedGroupingByPostId: {
      [key: number]: number;
    } = groupingByPostId;

    const addKeyIdOfDataTableToPostIdGroup =
      groupingByPostId[tableRow.postId] === undefined
        ? []
        : groupingByPostId[tableRow.postId];

    addKeyIdOfDataTableToPostIdGroup.push(tableRow[keyId]);

    updatedGroupingByPostId = {
      ...updatedGroupingByPostId,
      [tableRow.postId]: addKeyIdOfDataTableToPostIdGroup,
    };
    return updatedGroupingByPostId;
  }, {});

const jointPostWithFlickrPhotoId = (
  responseOfAllUploadedPosts,
  responseOfFlickrPhotoIdOfAllUploadedPosts,
  responseOfCategoryIdOfAllUploadedPosts
) =>
  responseOfAllUploadedPosts.map((responseOfUploadedPost) => {
    const arrayOfFlickrPhotoId = composeArrayOfIdToJointToUploadedPosts(
      responseOfFlickrPhotoIdOfAllUploadedPosts,
      "flickrPhotoId"
    )[responseOfUploadedPost.id];

    const arrayOfCategoryId = composeArrayOfIdToJointToUploadedPosts(
      responseOfCategoryIdOfAllUploadedPosts,
      "categoryId"
    )[responseOfUploadedPost.id];

    return {
      ...responseOfUploadedPost,
      flickrPhotoId: arrayOfFlickrPhotoId,
      categoryId: arrayOfCategoryId,
    };
  });
