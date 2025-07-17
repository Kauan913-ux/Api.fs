import express from "express";
import axios from "axios"

import { DatabaseJSON } from "./infrastructure/database-json";
import { User } from "./domain/user";

const app = express();

app.use(express.json());

const fsDatabase = new DatabaseJSON('database.json');

app.get("/customers", async (request, response) => {
  const database = fsDatabase.query();

  response.json(database);
});

app.patch("/customers", async (request, response) => {
  try {
    const user = new User(request.body);

    const insertedUser = fsDatabase.update(user);

    if (!insertedUser) {
      return response.status(404).json({ error: "Customer not found." });
    }

    response.json(insertedUser);
  } catch (err) {
    response.status(400).json({ error: err?.message ?? 'Error desconhecido' });
  }
});

app.listen(3000);