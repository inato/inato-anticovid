import * as Sentry from '@sentry/node';

import { ReportingService } from '../application/services/ReportingService';

export class SentryReportingService implements ReportingService {
  constructor({
    dsn,
    environment,
    release,
  }: {
    dsn: string | undefined;
    environment: string;
    release: string;
  }) {
    Sentry.init({ dsn, environment, release });
  }

  reportError(e: Error) {
    Sentry.captureException(e);
  }

  flush() {
    return Sentry.flush();
  }
}
