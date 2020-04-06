export interface LoggingService {
  log(message: any, ...rest: ReadonlyArray<any>): void;
}
