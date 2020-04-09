import { Client } from 'pg';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';

import { Trial, TrialRepository } from '../../domain';
import {
  GenericError,
  GenericErrorType,
  unknownError,
} from '../../domain/errors';

import { deserialize } from './deserialize';

export class PostgresTrialRepository implements TrialRepository {
  private readonly client: Client;

  private readonly tableName: string;

  constructor(client: Client, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  findAllTrials(): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<Trial>
  > {
    return pipe(
      TaskEither.tryCatch(
        () => this.client.query(`SELECT * from covid.${this.tableName}`),
        e =>
          unknownError(
            e instanceof Error ? e.message : 'Unknown pg query error',
          ),
      ),
      TaskEither.map(queryResult =>
        queryResult.rows.map((row: unknown) => deserialize(row)),
      ),
    );
  }
}
