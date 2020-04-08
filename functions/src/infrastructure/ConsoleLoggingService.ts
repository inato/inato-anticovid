import { LoggingService } from '../application';

export class ConsoleLoggingService implements LoggingService {
  log(...messages: ReadonlyArray<string>) {
    // eslint-disable-next-line no-console
    console.log(...messages);
  }
}
