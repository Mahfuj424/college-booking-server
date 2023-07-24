const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgokub5.mongodb.net/?retryWrites=true&w=majority`;

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

    const admissionCollection = client
      .db("collegeBooking")
      .collection("collegeName");
    const myCollegeCollection = client
      .db("collegeBooking")
      .collection("myCollege");
    const collegeCollection = client.db("collegeBooking").collection("college");

    app.get("/collegeName", async (req, res) => {
      const result = await admissionCollection.find().toArray();
      res.send(result);
    });

    app.post("/myCollege", async (req, res) => {
      const addCollege = req.body;
      const result = await myCollegeCollection.insertOne(addCollege);

      res.send(result);
    });

    // app.get('/myCollege/:email', async (req, res) => {
    //   const email = req.params.email
    //   const result = await myCollegeCollection.findOne({ email: email })
    //   res.send(result)
    // });

    app.get("/myCollege", async (req, res) => {
      const result = await myCollegeCollection.find().toArray();
      res.send(result);
    });

    app.get("/college", async (req, res) => {
      const result = await collegeCollection.find().toArray();
      res.send(result);
    });

    // app.get('/myCollege/:email', async (req, res) => {
    //   const result = await myCollegeCollection.findOne({studentEmail: req.params.email}).toArray()
    //   res.send(result)
    // });

    app.get("/myCollege/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await myCollegeCollection
        .find({ StudentEmail: req.params.email })
        .toArray();
      res.send(result);
    });


    
    // const result = await formCollection.find({studentEmail: req.params.email}).toArray();

    // const indexKeys = { title: 1, category: 1 };

    // const result = await collegeCollection.createIndex(indexKeys);

    // app.get(`/collegeSearchByTitle/:text`, async (req, res) => {
    //   const searchText = req.params.text;
    //   const result = await collegeCollection
    //     .find({
    //       name: { $regex: searchText, $options: "i" },
    //     })
    //     .toArray();
    //   res.send(result);
    // });

    // app.get(`/categoryTab/:text`, async (req, res) => {
    //   const text = req.params.text;
    //   const query = { subcategory: text };
    //   const result = await collegeCollection.find(query)
    //     .limit(3).toArray();
    //   res.send(result)
    // })

    // app.get("/searchText", async (req, res) => {
    //   const searchText = req?.query?.search;
    //   const result = await collegeCollection
    //     .find({
    //       name: { $regex: searchText, $options: "i" },
    //     })
    //     .toArray();
    //   res.send(result);
    // });

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
