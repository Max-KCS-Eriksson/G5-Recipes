import fs from "fs";
import { API_URL } from "./src/api/connection.js";
import { postData } from "./src/api/helpers.js";

const API_ENDPOINT = `${API_URL}/recipes`;
const JSON_FILE = "recipes.json"; // Expects an Array<Object>

const dataCollection = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

async function clearDB() {
  const API_ENDPOINT = "/clear";
  await fetch(`${API_URL}${API_ENDPOINT}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

async function postDataCollection(endpoint, dataCollection) {
  dataCollection.forEach((data) => {
    postData(endpoint, data);
  });
}

await clearDB();
await postDataCollection(API_ENDPOINT, dataCollection);
