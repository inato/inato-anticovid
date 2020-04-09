import * as TaskEither from 'fp-ts/lib/TaskEither';

export const taskEitherExtend: <G, A, B>(
  f: (a: A) => TaskEither.TaskEither<G, B>,
) => <E>(
  ma: TaskEither.TaskEither<E, A>,
) => TaskEither.TaskEither<E | G, B> = TaskEither.chain as any;
