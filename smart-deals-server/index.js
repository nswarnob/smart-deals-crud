const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//server mendatory
const uri =
  "mongodb+srv://dbUser:XfDifciPW9zAzoXH@cluster0.enxfdn6.mongodb.net/?appName=Cluster0";

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

    const db = client.db("smart_db");
    const productsCollection = db.collection("products");
    const bidsCollection = db.collection("bids");

   
    app.get('/products', async(req, res)=>{
      
      console.log(req.query);
      const email = req.query.email;
      const query={};
      if(email){
        query.email=email;
      }

      
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      
    } )



    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch('/products/:id', async (req, res)=>{
      const id = req.params.id;
      const updatedProduct = req.body;
      const query = {_id: new ObjectId (id)};
      const update = {
        $set: {
          name: updatedProduct.name,
          price: updatedProduct.price
        }
      }
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    } );

    //bids related api
    app.get('/bids', async(req,res)=>{

    const email = req.query.email;
    const query = {};
    if(email){
      query.bidder_email=email;     
    }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      
    });

    app.post('/bids', async(req, res)=>{
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//api related
app.get("/", (req, res) => {
  res.send("Hello World!");
}) -
  app.listen(port, () => {
    console.log(`Smart server is running on port: ${port}`);
  });
