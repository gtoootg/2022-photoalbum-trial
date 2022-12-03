import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoAlbumTable } from "../../../../server/mysql";
import mysql from "mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let flickrImageIdsOfUploadedPosts;
  let uploadedPosts;
  let categoriesOfAllPosts;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "njVjyI5CstMQ4VaYl2m1",
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

  const getCategoriesWithFlickrImageId = () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${PhotoAlbumTable.CATEGORY} LEFT OUTER JOIN ${PhotoAlbumTable.FLICKR_IMAGE} ON  ${PhotoAlbumTable.CATEGORY}.flickrImageTablePrimaryKeyId = ${PhotoAlbumTable.FLICKR_IMAGE}.id`,
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    });

  await getAllPosts().then((res) => {
    uploadedPosts = res;
  });

  await getAllFlickrPhotoIdsOfAllPosts().then((res) => {
    flickrImageIdsOfUploadedPosts = res;
  });

  await getCategoriesWithFlickrImageId().then((res) => {
    categoriesOfAllPosts = res;
  });

  res.json(
    jointPostWithFlickrPhotoId(
      uploadedPosts,
      flickrImageIdsOfUploadedPosts,
      categoriesOfAllPosts
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
  uploadedPosts,
  flickrPhotoIdOfUploadedPosts,
  categoriesOfAllPosts
) =>
  uploadedPosts.map((uploadedPost) => {
    const arrayOfFlickrPhotoId = composeArrayOfIdToJointToUploadedPosts(
      flickrPhotoIdOfUploadedPosts,
      "flickrPhotoId"
    )[uploadedPost.id];

    const categoriesOfUploadedPost = categoriesOfAllPosts.filter(
      (categoriesOfPost) => {
        return categoriesOfPost.postId === uploadedPost.id;
      }
    );

    const flickrImageIdsForEachCategory = categoriesOfUploadedPost.reduce(
      (acc, cur) => {
        if (!Object.keys(acc).includes(cur.categoryId.toString())) {
          return { ...acc, [cur.categoryId]: [cur.flickrPhotoId] };
        }
        return {
          ...acc,
          [cur.categoryId]: acc[cur.categoryId].concat([cur.flickrPhotoId]),
        };
      },
      {}
    );

    return {
      ...uploadedPost,
      flickrPhotoId: arrayOfFlickrPhotoId,
      categories: flickrImageIdsForEachCategory,
    };
  });
