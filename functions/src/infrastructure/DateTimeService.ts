import { TimeService } from "../application";

export class DateTimeService implements TimeService {
  get currentDate() {
    return new Date();
  }
}
