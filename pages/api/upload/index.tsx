import type { NextApiRequest, NextApiResponse } from "next";
import {
  buildSqlInsertQuery,
  SqlValueDataType,
  Table,
} from "../../../helper/server/sqlHelperFunction";
import { connection } from "../../../server/mysql";

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseOfUploadPost;
  let responseOfUploadFlickrPhotoId;
  let lastInsertIdOfPostTable;
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
          console.log(lastInsertIdOfPostTable);
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
          valuesForMultipleRowsOfFlickrPhotoIdTable(
            req.body.flickrImageIds,
            lastInsertIdOfPostTable
          )
        ),
        (error, data) => {
          if (!error) {
            responseOfUploadFlickrPhotoId = data;
            resolve("uploaded flickrPhotoId");
          }
          if (error) {
            console.log(error);
            reject("uploading flickrPhotoId error!");
          }
        }
      );
    });
  };

  await uploadPost(),
    await getLastInsertId(),
    uploadFlickrPhotoIdAndPostId(),
    res.json({
      post: responseOfUploadPost,
      flickrPhotoId: responseOfUploadFlickrPhotoId,
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
    key: "category",
    value: req.body.category,
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

const valuesForMultipleRowsOfFlickrPhotoIdTable = (
  flickrPhotoIds: number[],
  postId: number
) => {
  let valuesForMultipleRows = flickrPhotoIds
    .map((flickrPhotoId) => {
      return `(${flickrPhotoId}, ${postId})`;
    })
    .join(", ");
  return valuesForMultipleRows;
};
