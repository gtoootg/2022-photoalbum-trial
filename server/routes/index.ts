import express, { Request, Response } from "express";

const router = express.Router();

router.get("/movie", (req, res) => {
  res.end("this is movie");
});

module.exports = router;
