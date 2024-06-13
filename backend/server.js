const express = require("express");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const options = {
  maxPoolSize: 50,
};

const client = new MongoClient(process.env.MONGO_URI, options);

app.use(cookieParser());

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
  }
}

app.get("/builds/:id", async (req, res) => {
  try {
    const championId = req.params.id;
    const championData = await client
      .db("league_lookup")
      .collection("builds")
      .findOne({ name: championId });
    res.status(200).json(championData);
  } catch (error) {
    console.error("Error fetching champion data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/championAssets/:id", async (req, res) => {
  try {
    const championId = req.params.id;
    const championAssets = await client
      .db("league_lookup")
      .collection("championAssets")
      .findOne({ id: championId });
    res.status(200).json(championAssets);
  } catch (error) {
    console.error("Error fetching champion assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/championAssets", async (req, res) => {
  try {
    const championAssets = await client
      .db("league_lookup")
      .collection("championAssets")
      .find({})
      .toArray();
    res.status(200).json(championAssets);
  } catch (error) {
    console.error("Error fetching champion assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/itemAssets", async (req, res) => {
  try {
    const itemAssets = await client
      .db("league_lookup")
      .collection("itemAssets")
      .find({})
      .toArray();
    res.status(200).json(itemAssets);
  } catch (error) {
    console.error("Error fetching item assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send("Login and password are required");
  }

  try {
    const db = client.db("league_lookup");
    const users = db.collection("users");

    const user = await users.findOne({ login });
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid login or password");
    }

    const token = jwt.sign({ login: user.login }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: false });

    res.status(200).send({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/register", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send("Login and password are required");
  }

  const newUser = {
    login,
    password,
    favourites: [],
  };

  try {
    const db = client.db("league_lookup");
    const users = db.collection("users");

    const existingUser = await users.findOne({ login });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    await users.insertOne(newUser);

    const token = jwt.sign({ login: newUser.login }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    res.status(201).send("User registered and logged in");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
}

app.get("/current-user", authenticateToken, async (req, res) => {
  try {
    const db = client.db("league_lookup");
    const users = db.collection("users");

    const user = await users.findOne({ login: req.user.login });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userInfo = {
      login: user.login,
      favourites: user.favourites,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/favorites", authenticateToken, async (req, res) => {
  try {
    const db = client.db("league_lookup");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ login: req.user.login });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.favourites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/favorites", authenticateToken, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Champion ID is required");
  }

  try {
    const db = client.db("league_lookup");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { login: req.user.login },
      { $addToSet: { favourites: id } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(201).send("Champion added to favorites");
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/favorites", authenticateToken, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Champion ID is required");
  }

  try {
    const db = client.db("league_lookup");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { login: req.user.login },
      { $pull: { favourites: id } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Champion removed from favorites");
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connect().catch(console.error);
