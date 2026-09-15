import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://eva3_express:ndzU8CM9xXSfz6ed@cluster-express.q5pj61m.mongodb.net/?appName=cluster-express";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

await client.connect()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

export default client;