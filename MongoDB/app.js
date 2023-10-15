const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('fruitsDB');
    const coll = database.collection('fruits');

    // let res = await coll.insertMany([
    //   { name: 'Apple', taste: 'great' },
    //   { name: 'Banana', taste: 'good' },
    //  ]);

    const cursor = coll.find();
    for await (const doc of cursor) {
      console.log(doc);
    }

    // console.log(res);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);