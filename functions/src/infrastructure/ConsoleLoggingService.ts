import { LoggingService } from "../application";

export class ConsoleLoggingService implements LoggingService {
  log(...messages: ReadonlyArray<string>) {
    console.log(...messages);
  }
}
