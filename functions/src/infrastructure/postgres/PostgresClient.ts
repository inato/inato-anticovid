import { Client } from "pg";

const PG_IP = "34.77.35.199";
const PG_PORT = 5432;
const PG_USER = "app";
const PG_PASSWORD = "ZrFC8IxUmVT59JXhZcZWJBA1u";
const PG_DB = "postgres";

const PG_CONNECTION_STRING = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_IP}:${PG_PORT}/${PG_DB}`;

export const setupPostgresClient = async () => {
  const client = new Client({
    connectionString: PG_CONNECTION_STRING
  });

  await client.connect();

  return client;
};
