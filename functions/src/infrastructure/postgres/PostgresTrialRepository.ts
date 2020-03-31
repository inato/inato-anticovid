import { Client } from "pg";
import { Trial, TrialRepository } from "../../domain";
import { deserialize } from "./deserialize";
import * as TaskEither from "fp-ts/lib/TaskEither";
import {
  GenericError,
  GenericErrorType,
  unknownError
} from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";

export class PostgresTrialRepository implements TrialRepository {
  constructor(
    private readonly client: Client,
    private readonly tableName: string
  ) {}

  findAllTrials(): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<Trial>
  > {
    return pipe(
      TaskEither.tryCatch(
        () => this.client.query(`SELECT * from covid.${this.tableName}`),
        e => unknownError(e instanceof Error ? e.message : "Unknown error")
      ),
      TaskEither.map(queryResult =>
        queryResult.rows.map((row: unknown) => deserialize(row))
      )
    );
  }
}
