const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwhgbgz.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

const collegeInfoCollection = client.db("collegeAdmissionDB").collection("collegeInfo")
const graduatesImageCollection = client.db("collegeAdmissionDB").collection("graduatesImage")
const reviewsCollection = client.db("collegeAdmissionDB").collection("reviews")
const researchPapersCollection = client.db("collegeAdmissionDB").collection("researchPaper")

app.get('/collegeInfo', async(req,res) =>{
    const result = await collegeInfoCollection.find().toArray();
    res.send(result)
})
app.get('/graduatesImage', async(req,res) =>{
    const result = await graduatesImageCollection.find().toArray();
    res.send(result)
})
app.get('/reviews', async(req,res) =>{
    const result = await reviewsCollection.find().toArray();
    res.send(result)
})
app.get('/researchPapers', async(req,res) =>{
    const result = await researchPapersCollection.find().toArray();
    res.send(result)
})

app.get('/collegeInfo/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}

    const result = await collegeInfoCollection.findOne(query);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('college admission is running ')
})

app.listen(port, ()=>{
    console.log(`College Admission is running on ${port}`);
})