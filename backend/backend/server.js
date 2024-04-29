
const express = require("express");
const { MongoClient } = require("mongodb");

const dotenv=require('dotenv');
dotenv.config();

const app = express();

const client = new MongoClient(process.env.MONGO_URI);

app.get("/matches", async (req, res) => {
  let data = [];
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
    const database = client.db("league_lookup");
    const coll = database.collection("matches");
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
  res.json(data);
});


app.get("/championAssets", async (req, res) => {
  let data = [];
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
    const database = client.db("league_lookup");
    const coll = database.collection("championAssets");
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
  res.json(data);
});

app.get("/itemAssets", async (req, res) => {
  let data = [];
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
    const database = client.db("league_lookup");
    const coll = database.collection("itemAssets");
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
  res.json(data);
});

app.get("/players", async (req, res) => {
  let data = [];
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
    const database = client.db("league_lookup");
    const coll = database.collection("players");
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
  res.json(data);
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});