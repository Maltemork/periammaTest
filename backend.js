"use strict";

import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("App running...");
});

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

app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM artists WHERE artistId=?;";
  const values = [id];

  connection.query(query, values, (error, results) => {
    errorResult(error, results, response);
  });
});
app.post("/artists", async (request, response) => {
  const reqBody = request.body;
  connection.query(
    "INSERT INTO artists(name, birthdate, activeSince, labels, website, genres, shortDescription, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      reqBody.name,
      reqBody.birthdate,
      reqBody.activeSince,
      reqBody.labels,
      reqBody.website,
      reqBody.genres,
      reqBody.shortDescription,
      reqBody.image,
    ],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
app.put("/artists/:id", async (request, response) => {
  const reqArtistId = request.params.id;
  const reqBody = request.body;
  connection.query(
    "UPDATE artists SET name = ?, birthdate = ? WHERE artistId = ?",
    [reqBody.name, reqBody.birthdate, reqArtistId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
