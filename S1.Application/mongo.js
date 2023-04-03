const {MongoClient} = require('mongodb');

async function main() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://leboyd:F1pWvHyIlODC43W1@cluster.u2fc0fu.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try{
      await client.connect();

      await findListings(client, 10);
    } catch(e){
      console.error(e);
    } finally {
      await client.close();
    }
  }

main().catch(console.error);

  async function findListings(client, resultsLimit) {
    const cursor = client
      .db('sample_airbnb')
      .collection('listingsAndReviews')
      .find()
      .limit(resultsLimit);

    const results = await cursor.toArray();
    if (results.length > 0) {
      console.log(`Found ${results.length} listing(s):`);
      results.forEach((result, i) => {
        date = new Date(result.last_review).toDateString();

        console.log();
        console.log(`${i + 1}. name: ${result.name}`);
        console.log(`   _id: ${result._id}`);
        console.log(`   bedrooms: ${result.bedrooms}`);
        console.log(`   bathrooms: ${result.bathrooms}`);
        console.log(
          `   most recent review date: ${new Date(
            result.last_review
          ).toDateString()}`
        );
      });
    }
  }
module.exports =  main;