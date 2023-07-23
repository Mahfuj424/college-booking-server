const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgokub5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const admissionCollection = client.db('collegeBooking').collection('collegeName')


    
    // app.get('/admission-college', async (req, res) => {
    //   const result = await addUserCollection.find().toArray()
    //   res.send(result)
    //   console.log(result);
    // })

    const docs = [
      {
        "name": "University of California, Berkeley",
        "country": "USA"
      },
      {
        "name": "University of Cambridge",
        "country": "United Kingdom"
      },
      {
        "name": "University of Tokyo",
        "country": "Japan"
      },
      {
        "name": "University of Sydney",
        "country": "Australia"
      },
      {
        "name": "University of Cape Town",
        "country": "South Africa"
      },
      {
        "name": "University of São Paulo",
        "country": "Brazil"
      }
    ]


    app.post("/collegeName", async (req, res) => {
      const options = {ordered: true}
      const result = await addClassCollection.insertMany(docs, options);
      res.send(result);
      console.log(result);
    });

    
    


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("college booking");
});

app.listen(port, () => {
  console.log(`college booking is on port: ${port}`);
});
