import { LoggingService } from "../../application/services/LoggingService";

export class ConsoleLoggingService implements LoggingService {
  log(...messages: ReadonlyArray<string>) {
    console.log(...messages);
  }
}
