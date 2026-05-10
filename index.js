const express = require("express");
const cors = require("cors");
const dotenv =require("dotenv")
const { MongoClient, ServerApiVersion } = require("mongodb");
dotenv.config()
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destination");

app.post("/destinations", async (req, res) => {
  const destinations = req.body;
  const result = await destinationCollection.insertOne(destinations);
  res.json(result);
});
app.get("/destinations", async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
