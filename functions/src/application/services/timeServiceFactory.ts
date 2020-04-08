import { TimeService } from './TimeService';

export const timeServiceFactory = ({
  currentDate = new Date(),
}: Partial<TimeService> = {}) => ({
  currentDate,
});
