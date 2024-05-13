const express = require("express");
const { MongoClient } = require("mongodb");

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const options = {
  maxPoolSize: 50,
};

const client = new MongoClient(process.env.MONGO_URI, options);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    
  }
}


app.get('/builds/:id', async (req, res) => {
  try {
    const championId = req.params.id;
    const championData = await client.db("league_lookup").collection("builds").findOne({name : championId});

    
   
    
    res.status(200).json(championData);
  } catch (error) {
    console.error('Error fetching champion data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/championAssets/:id', async (req, res) => {
  try {
    const championId = req.params.id;
    const championAssets = await client.db("league_lookup").collection("championAssets").findOne({name : championId});
    
    res.status(200).json(championAssets);
  } catch (error) {
    console.error('Error fetching champion assets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/itemAssets', async (req, res) => {
  try {
    const itemAssets = await client.db("league_lookup").collection("itemAssets").find({}).toArray();
    res.status(200).json(itemAssets);
  } catch (error) {
    console.error('Error fetching item assets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


connect().catch(console.error);