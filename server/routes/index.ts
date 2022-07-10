import express, { Request, Response } from "express";
// import { connection } from "../mysql";

const router = express.Router();

// router.post("/country", (req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   const newCountry = {
//     name: "France",
//     capital: "paris",
//   };

//   console.log(req.body);

//   // connection.query(
//   //   "INSERT INTO `heroku_cd8e62582467f27`.`new_table` (`name`, `capital`) VALUES (?,?);",
//   //   [req.body.name, req.body.capital],
//   //   (error, data) => {
//   //     if (!error) {
//   //       res.json(data);
//   //     }
//   //     if (error) {
//   //       console.log(error);
//   //     }
//   //   }
//   // );
// });

// module.exports = router;
