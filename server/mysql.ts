import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9ZmL08RDk3Kf9nei5sJg",
  database: "photoalbum",
});

export enum PhotoAlbumTable {
  POST = "photoalbum.post",
  FLICKR_PHOTO_ID = "photoalbum.flickr_photo_id",
  CATEGORY_ID = "photoalbum.category_id",
}
