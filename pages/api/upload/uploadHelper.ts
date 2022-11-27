import { NextApiRequest } from "next";
import {
  buildSqlInsertQuery,
  SqlValueDataType,
  Table,
} from "../../../helper/server/sqlHelperFunction";

export const uploadPost = (connection, req) => {
  return new Promise((resolve, reject) => {
    connection.query(
      buildSqlInsertQuery(Table.POST, sqlValuesForPostTable(req)),
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
  return new Promise((resolve, reject) => {
    connection.query(
      buildSqlInsertQuery(
        Table.FLICKR_PHOTO_ID,
        sqlColumnsAndDataTypeForFlickrPhotoIdTable,
        valuesForMultipleRowsWithPostId(
          req.body.flickrImageIds,
          lastInsertIdOfPostTable
        )
      ),
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
      `SELECT * from ${Table.FLICKR_PHOTO_ID} where postId= ${lastInsertIdOfPostTable}`,
      (error, data) => {
        if (error) {
          reject("error");
        }
        resolve(data);
      }
    );
  });
};

export const composePayloadForCategoryIdTable = (
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
      tableRowIdOfFlickrPhotoIdTable:
        findPrimaryKeyIdOfFlickrPhotoId(flickrPhotoId),
    }));

  let payload = [];

  for (const categoryId in flickrPhotoIdsForSelectedCategories) {
    payload.push(
      payloadOfFlickrPhotoIdsForOneCategory(
        flickrPhotoIdsForSelectedCategories[categoryId],
        categoryId
      )
    );
  }

  return payload;
};

const sqlValuesForPostTable = (req: NextApiRequest) => [
  {
    key: "title",
    value: req.body.title,
    dataType: SqlValueDataType.VARCHAR,
  },
  {
    key: "description",
    value: req.body.description,
    dataType: SqlValueDataType.VARCHAR,
  },
  {
    key: "country",
    value: req.body.country,
    dataType: SqlValueDataType.VARCHAR,
  },
  {
    key: "lat",
    value: req.body.lat,
    dataType: SqlValueDataType.DECIMAL,
  },
  {
    key: "lng",
    value: req.body.lng,
    dataType: SqlValueDataType.DECIMAL,
  },
];

const sqlColumnsAndDataTypeForFlickrPhotoIdTable = [
  {
    key: "flickrPhotoId",
    dataType: SqlValueDataType.BIG_INT,
  },
  {
    key: "postId",
    dataType: SqlValueDataType.INT,
  },
];

const sqlColumnsAndDataTypeForCategoryTable = [
  {
    key: "categoryId",
    dataType: SqlValueDataType.INT,
  },
  {
    key: "postId",
    dataType: SqlValueDataType.INT,
  },
];

const valuesForMultipleRowsWithPostId = (
  multipleValues: number[],
  postId: number
) => {
  let valuesForMultipleRows = multipleValues
    .map((flickrPhotoId) => {
      return `(${flickrPhotoId}, ${postId})`;
    })
    .join(", ");
  return valuesForMultipleRows;
};
