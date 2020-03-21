import { Client } from "pg";
import { Trial, TrialRepository } from "../../domain";
import { deserialize } from "./deserialize";

export class PostgresTrialRepository implements TrialRepository {
  constructor(private client: Client) {}

  async findAllTrials(): Promise<Array<Trial>> {
    const queryResult = await this.client.query(
      `SELECT * from covid.who_trial`
    );
    return queryResult.rows.map(row => deserialize(row));
  }
}
