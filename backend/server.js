const express = require("express");
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken')
const cookieParser= require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
const options = {
  maxPoolSize: 50,
};

const client = new MongoClient(process.env.MONGO_URI, options);

app.use(cookieParser());


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

app.get('/championAssets', async (req, res) => {
  try {
    
    const championAssets = await client.db("league_lookup").collection("championAssets").find({}).toArray();
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


const data=[{ 
  login:"John123",
  password:"pass",
  email:"mid@gmail.com"
  },
{
  login:"nhoJ123",
  password:"passas",
  email:"midas@gmail.com"
}];
app.post('/api/login', (req, res) => {
  const { login, password } = req.body;

  console.log(req.body); 
  console.log(login);

  const user = data.find(u => u.login === login);
  if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ login: user.login, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


connect().catch(console.error);
