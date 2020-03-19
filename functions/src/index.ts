import * as functions from "firebase-functions";
import { Client } from "pg";
import algoliasearch from "algoliasearch";

const ALGOLIA_CLIENT_ID = "QC98I887KP";
const ALGOLIA_API_KEY = functions.config().algolia.apiKey;
const ALGOLIA_INDEX_NAME = functions.config().algolia.index;
const PG_IP = "***REMOVED***";
const PG_PORT = 5432;
const PG_USER = "app";
const PG_PASSWORD = "***REMOVED***";
const PG_DB = "postgres";

const PG_CONNECTION_STRING = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_IP}:${PG_PORT}/${PG_DB}`;

const _reduce = async <T, R>(
  array: ReadonlyArray<Promise<T> | T>,
  callback: (acc: R, arg: T, index: number) => R | Promise<R>,
  acc: R,
  index: number
): Promise<R> => {
  if (index >= array.length) {
    return acc;
  }

  return _reduce(
    array,
    callback,
    await callback(acc, await array[index], index),
    index + 1
  );
};

export const reduce = async <T, R>(
  array: ReadonlyArray<Promise<T> | T> | Promise<ReadonlyArray<Promise<T> | T>>,
  callback: (acc: R, arg: T, index: number) => R | Promise<R>,
  acc: R
): Promise<R> => _reduce(await array, callback, acc, 0);

export const forEachSequence = async <T, R>(
  array: ReadonlyArray<Promise<T> | T> | Promise<ReadonlyArray<Promise<T> | T>>,
  callback: (arg: T, index: number) => R | Promise<R>
): Promise<void> => {
  await reduce(
    array,
    async (acc, item, index) => {
      await callback(item, index);

      return acc;
    },
    null
  );
};

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

export const uploadToAlgolia = functions
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

    const rows = res.rows;
    const totalNumberOfRows = res.rows.length;
    const batches = [];
    while (rows.length) {
      const batch = res.rows.splice(0, 50);
      batches.push(batch);
    }

    await forEachSequence(batches, async batch => {
      await algoliaIndex.saveObjects(
        batch.map(row => ({
          objectID: row.trialid,
          ...row
        }))
      );
      console.log(`Sent ${batch.length} objects`);
    });

    console.log("Replaced all objects");

    await client.end();
    response.send(`Indexed ${totalNumberOfRows} rows`);
  });
