import { ReportingService } from './ReportingService';

export const reportingServiceFactory = ({
  reportError = () => {
    return undefined;
  },
}: Partial<ReportingService> = {}): ReportingService => ({
  reportError,
});
