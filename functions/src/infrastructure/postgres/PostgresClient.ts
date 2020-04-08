import { Client } from "pg";

export const setupPostgresClient = async ({
  ip,
  port,
  user,
  password,
  db
}: {
  ip: string;
  port: number;
  user: string;
  password: string;
  db: string;
}) => {
  const client = new Client({
    connectionString: `postgresql://${user}:${password}@${ip}:${port}/${db}`
  });

  await client.connect();

  return client;
};
