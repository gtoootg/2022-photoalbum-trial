import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b90983c39c9b08",
  password: "28f3387b",
  database: "heroku_cd8e62582467f27",
});
