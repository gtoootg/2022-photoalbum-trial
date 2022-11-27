import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoAlbumTable } from "../../../../server/mysql";
import mysql from "mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfFlickrPhotoIdOfAllPosts;
  let responseOfAllPosts;
  let responseOfCategoryIdOfAllPosts;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9ZmL08RDk3Kf9nei5sJg",
    database: "photoalbum",
  });

  const getAllFlickrPhotoIdsOfAllPosts = () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * from ${PhotoAlbumTable.FLICKR_IMAGE}`,
        (error, data) => {
          if (error) {
            return reject(error);
          }
          resolve(data);
        }
      );
    });

  // const getAllCategoryIdOfAllUpdatedPosts = new Promise((resolve, reject) => {
  //   connection.query(
  //     `SELECT * from ${PhotoAlbumTable.CATEGORY}`,
  //     (error, data) => {
  //       if (error) {
  //         return reject(error);
  //       }

  //       responseOfCategoryIdOfAllPosts = data;
  //       resolve(responseOfCategoryIdOfAllPosts);
  //     }
  //   );
  // });

  const getAllPosts = () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${PhotoAlbumTable.POST}`,
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    });

  const getCategories = () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${PhotoAlbumTable.CATEGORY}`,
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    });

  await getAllPosts().then((res) => {
    responseOfAllPosts = res;
  });

  await getAllFlickrPhotoIdsOfAllPosts().then((res) => {
    responseOfFlickrPhotoIdOfAllPosts = res;
  });

  await getCategories().then((res) => {
    responseOfCategoryIdOfAllPosts = res;
  });

  console.log(responseOfCategoryIdOfAllPosts);

  res.json(
    jointPostWithFlickrPhotoId(
      responseOfAllPosts,
      responseOfFlickrPhotoIdOfAllPosts
      // responseOfCategoryIdOfAllPosts
    )
  );
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
  responseOfFlickrPhotoIdOfAllUploadedPosts
  // responseOfCategoryIdOfAllUploadedPosts
) =>
  responseOfAllUploadedPosts.map((responseOfUploadedPost) => {
    const arrayOfFlickrPhotoId = composeArrayOfIdToJointToUploadedPosts(
      responseOfFlickrPhotoIdOfAllUploadedPosts,
      "flickrPhotoId"
    )[responseOfUploadedPost.id];

    // const arrayOfCategoryId = composeArrayOfIdToJointToUploadedPosts(
    //   responseOfCategoryIdOfAllUploadedPosts,
    //   "categoryId"
    // )[responseOfUploadedPost.id];

    return {
      ...responseOfUploadedPost,
      flickrPhotoId: arrayOfFlickrPhotoId,
      // categoryId: arrayOfCategoryId,
    };
  });
