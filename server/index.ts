import express, { Request, Response } from "express";
import next from "next";
import env from "../env";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  const showRoute = require("./routes/index");

  server.use("/api", showRoute);

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    console.log(env);
  });
  server.get("api/movie", (req, res) => {
    res.end("this is movie");
  });
});
