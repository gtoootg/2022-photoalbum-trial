import express, { Request, Response } from "express";

const router = express.Router();

router.get("/movie", (req, res) => {
  res.end("this is movie");
});

router.get("/countries", (req, res) => {
  const countries = [
    { name: "japan", capital: "tokyo" },
    { name: "germany", capital: "berlin" },
  ];
  res.json(countries);
});

module.exports = router;
