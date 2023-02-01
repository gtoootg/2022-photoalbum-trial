import {
  buildSqlInsertValue,
  SqlValueDataType,
  TableColumnProps,
} from "../../../helper/server/sqlHelperFunction";
import { PhotoAlbumTable } from "../../../../server/data-base/mysql";

export const uploadPost = (connection, req) => {
  const { title, description, country, lat, lng } = req.body;

  const payload: (string | boolean | number)[][] = [
    [title, description, country, lat, lng],
  ];

  const tableColumn: TableColumnProps[] = [
    { key: "title", dataType: SqlValueDataType.VARCHAR },
    { key: "description", dataType: SqlValueDataType.VARCHAR },
    { key: "country", dataType: SqlValueDataType.VARCHAR },
    { key: "lat", dataType: SqlValueDataType.BIG_INT },
    { key: "lng", dataType: SqlValueDataType.BIG_INT },
  ];

  buildSqlInsertValue(PhotoAlbumTable.POST, tableColumn, payload);

  return new Promise((resolve, reject) => {
    connection.query(
      buildSqlInsertValue(PhotoAlbumTable.POST, tableColumn, payload),
      (error, data) => {
        if (!error) {
          resolve(data);
        }
        if (error) {
          console.log(error);
          reject("uploading post error!");
        }
      }
    );
  });
};

export const getLastInsertId = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT LAST_INSERT_ID()", (error, data) => {
      if (!error) {
        resolve(data[0]["LAST_INSERT_ID()"]);
      }
      if (error) {
        console.log(error);
        reject("last insert id failed");
      }
    });
  });
};

export const uploadFlickrPhotoIdAndPostId = (
  connection,
  req,
  lastInsertIdOfPostTable
) => {
  const { flickrImageIds } = req.body;

  const payload = flickrImageIds.map((flickrImageId) => {
    return [flickrImageId, lastInsertIdOfPostTable];
  });
  const tableColumn: TableColumnProps[] = [
    { key: "flickrPhotoId", dataType: SqlValueDataType.INT },
    { key: "postId", dataType: SqlValueDataType.BIG_INT },
  ];

  return new Promise((resolve, reject) => {
    connection.query(
      buildSqlInsertValue(PhotoAlbumTable.FLICKR_IMAGE, tableColumn, payload),
      (error, data) => {
        if (error) {
          console.log(error);
          reject("uploading flickrPhotoId error!");
        }
        resolve(data);
      }
    );
  });
};

export const getDataFromFlickrPhotoIdTableWherePostIdIsLatest = (
  connection,
  lastInsertIdOfPostTable
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${PhotoAlbumTable.FLICKR_IMAGE} where postId= ${lastInsertIdOfPostTable}`,
      (error, data) => {
        if (error) {
          reject("error");
        }
        resolve(data);
      }
    );
  });
};

export const insertIntoCategoryTable = (
  connection,
  req,
  dataOfFlickrPhotoIdTableWherePostIdIsLatest
) => {
  const flickrPhotoIdsForSelectedCategories = req.body.categories;

  const tableColumn: TableColumnProps[] = [
    { key: "categoryId", dataType: SqlValueDataType.INT },
    { key: "flickrImageTablePrimaryKeyId", dataType: SqlValueDataType.INT },
  ];

  const payload = composePayloadForCategoryTable(
    dataOfFlickrPhotoIdTableWherePostIdIsLatest,
    flickrPhotoIdsForSelectedCategories
  ).map((data) => [data.categoryId, data.flickrImageTablePrimaryKeyId]);

  return new Promise((resolve, reject) => {
    connection.query(
      buildSqlInsertValue(PhotoAlbumTable.CATEGORY, tableColumn, payload),
      (error, data) => {
        if (!error) {
          resolve(data);
        }
        if (error) {
          console.log(error);
          reject("uploading post error!");
        }
      }
    );
  });
};

export const composePayloadForCategoryTable = (
  dataOfFlickrPhotoIdTableWherePostIdIsLatest,
  flickrPhotoIdsForSelectedCategories
) => {
  const findPrimaryKeyIdOfFlickrPhotoId = (flickrPhotoId) =>
    dataOfFlickrPhotoIdTableWherePostIdIsLatest.filter(
      (data) => data.flickrPhotoId.toString() === flickrPhotoId
    )[0]["id"];

  const payloadOfFlickrPhotoIdsForOneCategory = (
    flickrPhotoIdsForOneCategory,
    categoryId
  ) =>
    flickrPhotoIdsForOneCategory.map((flickrPhotoId) => ({
      categoryId: categoryId,
      flickrImageTablePrimaryKeyId:
        findPrimaryKeyIdOfFlickrPhotoId(flickrPhotoId),
    }));

  let payload = [];

  for (const categoryId in flickrPhotoIdsForSelectedCategories) {
    payload = payload.concat(
      payloadOfFlickrPhotoIdsForOneCategory(
        flickrPhotoIdsForSelectedCategories[categoryId],
        categoryId
      )
    );
  }

  return payload;
};
