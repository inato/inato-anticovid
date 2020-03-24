import { Client } from "pg";
import { Trial, TrialRepository } from "../../domain";
import { deserialize } from "./deserialize";

export class PostgresTrialRepository implements TrialRepository {
  constructor(
    private readonly client: Client,
    private readonly tableName: string
  ) {}

  async findAllTrials(): Promise<Array<Trial>> {
    const queryResult = await this.client.query(
      `SELECT * from covid.${this.tableName}`
    );
    return queryResult.rows.map((row: unknown) => deserialize(row));
  }
}
