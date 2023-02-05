import { PhotoAlbumTable } from "../../../../data-base/mysql";

export const getAllPosts = (connection) =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${PhotoAlbumTable.PHOTOALBUM_POST}`, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });

export const getAllFlickrPhotoIdsOfAllPosts = (connection) =>
  new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${PhotoAlbumTable.PHOTOALBUM_FLICKR_IMAGE}`,
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      }
    );
  });

export const getCategoriesWithFlickrImageId = (connection) =>
  new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${PhotoAlbumTable.PHOTOALBUM_CATEGORY} LEFT OUTER JOIN ${PhotoAlbumTable.PHOTOALBUM_FLICKR_IMAGE} ON  ${PhotoAlbumTable.PHOTOALBUM_CATEGORY}.flickrImageTablePrimaryKeyId = ${PhotoAlbumTable.PHOTOALBUM_FLICKR_IMAGE}.id`,
      (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });

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

export const jointPostWithFlickrPhotoId = (
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
