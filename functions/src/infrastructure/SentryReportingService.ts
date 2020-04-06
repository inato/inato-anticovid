import * as Sentry from "@sentry/node";
import { ReportingService } from "../application/services/ReportingService";

export class SentryReportingService implements ReportingService {
  constructor({
    dsn,
    environment
  }: {
    dsn: string | undefined;
    environment: string;
  }) {
    Sentry.init({ dsn, environment });
  }

  reportError(e: Error) {
    Sentry.captureException(e);
  }
}
