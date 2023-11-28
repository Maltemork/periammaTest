"use strict";

import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);

function errorResult(err, result, response) {
  if (err) {
    console.log(err);
  } else {
    response.json(result);
  }
}
/* ------------ Sponsors ------------ */
app.get("/sponsors", async (req, res) => {
  connection.query(
    "SELECT * FROM sponsors ORDER BY sponsorName;",
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, res);
    }
  );
});
