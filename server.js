import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
const app = express();
import { router } from "./routes/wetherRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path/posix";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static("public"));

//using ejs template engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//for url encoded data parsing
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/", router);

//localhost connection

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server connected at ${port}`);
});
