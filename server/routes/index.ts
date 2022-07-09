import express, { Request, Response } from "express";
import { connection } from "../mysql";

const router = express.Router();

router.get("/movie", (req, res) => {
  res.end("this is movie");
});

router.get("/countries", (req, res) => {
  const countries = [
    { name: "japan", capital: "tokyo" },
    { name: "germany", capital: "berlin" },
  ];

  connection.query("SELECT * FROM new_table", (error, rows) => {
    if (!error) {
      res.json(rows);
    }
    if (error) {
      console.log(error);
    }
  });
});

module.exports = router;
