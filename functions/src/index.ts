import * as functions from "firebase-functions";
import { Client } from "pg";
import algoliasearch from "algoliasearch";

const ALGOLIA_CLIENT_ID = "QC98I887KP";
const ALGOLIA_API_KEY = "***REMOVED***";
const ALGOLIA_INDEX_NAME = "prod_data";
const PG_IP = "***REMOVED***";
const PG_PORT = 5432;
const PG_USER = "app";
const PG_PASSWORD = "***REMOVED***";
const PG_DB = "postgres";

const PG_CONNECTION_STRING = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_IP}:${PG_PORT}/${PG_DB}`;

const setupDBClient = async () => {
  const client = new Client({
    connectionString: PG_CONNECTION_STRING
  });

  await client.connect();

  return client;
};

const setupAlgoliaIndex = () => {
  const client = algoliasearch(ALGOLIA_CLIENT_ID, ALGOLIA_API_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  return index;
};

export const uploadDataToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(async (request, response) => {
    const client = await setupDBClient();
    const algoliaIndex = setupAlgoliaIndex();

    const res = await client.query("SELECT * from covid.who_trial");

    console.log(`Found ${res.rows.length}`);

    await algoliaIndex.clearObjects();

    await algoliaIndex.saveObjects(
      res.rows.map(row => ({
        objectID: row.trialid,
        ...row
      }))
    );

    console.log("Replaced all objects");

    response.send(`Indexed ${res.rows.length} rows`);

    await client.end();
  });
