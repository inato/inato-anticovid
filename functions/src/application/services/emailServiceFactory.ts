import * as TaskEither from 'fp-ts/lib/TaskEither';

import { EmailService } from './EmailService';

export const emailServiceFactory = ({
  sendNewResultsForSubscription = () => TaskEither.right(undefined),
}: Partial<EmailService> = {}): EmailService => ({
  sendNewResultsForSubscription,
});
