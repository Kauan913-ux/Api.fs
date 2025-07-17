import express from "express";
import * as fs from "fs";
import axios from "axios"

const app = express();

app.use(express.json());

app.get("/customers", async (request, response) => {
  const databaseStr = fs.readFileSync(`database.json`, { encoding: `utf-8` });

  const database = JSON.parse(databaseStr);

  response.json(database);
});

app.patch("/customers", async (request, response) => {
  const databaseStr = fs.readFileSync(`database.json`, { encoding: `utf-8` });
  const database = JSON.parse(databaseStr);

  const { id, name, email } = request.body;

  const customerIndex = database.findIndex((customers) => customers.id === id);
  if (customerIndex === -1) {
    return response.status(404).json({ error: "Customer not found." });
  }

  database[customerIndex] = { id, name, email };
  fs.writeFileSync(`database.json`, JSON.stringify(database, null, 2));
  response.json(database[customerIndex]);
});

app.listen(3000);