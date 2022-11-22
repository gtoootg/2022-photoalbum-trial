import type { NextApiRequest, NextApiResponse } from "next";
import {
  buildSqlInsertQuery,
  SqlValueDataType,
  Table,
} from "../../../helper/server/sqlHelperFunction";
import { connection } from "../../../server/mysql";
import { getDataOfLastInsertedPostIdFromFlickrPhotoIdTable } from "./uploadHelper";

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfUploadPost;
  let responseOfUploadFlickrPhotoId;
  let responseOfUploadCategoryId;
  let lastInsertIdOfPostTable;
  let dataOfLastInsertedPostIdFromFlickrPhotoIdTable;

  const uploadPost = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        buildSqlInsertQuery(Table.POST, sqlValuesForPostTable(req)),
        (error, data) => {
          if (!error) {
            responseOfUploadPost = data;
            resolve("uploaded post");
          }
          if (error) {
            console.log(error);
            reject("uploading post error!");
          }
        }
      );
    });
  };

  const getLastInsertId = () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT LAST_INSERT_ID()", (error, data) => {
        if (!error) {
          lastInsertIdOfPostTable = data[0]["LAST_INSERT_ID()"];
          resolve("got last insert id");
        }
        if (error) {
          console.log(error);
          reject("last insert id failed");
        }
      });
    });
  };

  const uploadFlickrPhotoIdAndPostId = () => {
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
          responseOfUploadFlickrPhotoId = data;
          resolve("uploaded flickrPhotoId");
        }
      );
    });
  };

  const uploadCategoryIdAndPostId = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        buildSqlInsertQuery(
          Table.CATEGORY_ID,
          sqlColumnsAndDataTypeForCategoryTable,
          valuesForMultipleRowsWithPostId(
            req.body.categories,
            lastInsertIdOfPostTable
          )
        ),
        (error, data) => {
          if (error) {
            console.log(error);
            reject("uploading categoryId error!");
          }
          responseOfUploadCategoryId = data;
        }
      );
    });
  };

  await uploadPost(),
    await getLastInsertId(),
    await uploadFlickrPhotoIdAndPostId(),
    await getDataOfLastInsertedPostIdFromFlickrPhotoIdTable(
      lastInsertIdOfPostTable,
      dataOfLastInsertedPostIdFromFlickrPhotoIdTable
    );
  console.log(dataOfLastInsertedPostIdFromFlickrPhotoIdTable);
  // uploadCategoryIdAndPostId();
  res.json({
    post: responseOfUploadPost,
    flickrPhotoId: responseOfUploadFlickrPhotoId,
    categoryId: dataOfLastInsertedPostIdFromFlickrPhotoIdTable,
  });
}

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
