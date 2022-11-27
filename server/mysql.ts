import mysql from "mysql";

// export const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "9ZmL08RDk3Kf9nei5sJg",
//   database: "photoalbum",
// });

export enum PhotoAlbumTable {
  POST = "photoalbum.post",
  FLICKR_IMAGE = "photoalbum.flickr_image",
  CATEGORY = "photoalbum.category",
}
