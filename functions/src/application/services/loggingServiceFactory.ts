import { LoggingService } from './LoggingService';

export const loggingServiceFactory = ({
  log = () => {
    return undefined;
  },
}: Partial<LoggingService> = {}): LoggingService => ({
  log,
});
