import * as admin from 'firebase-admin';

export const setupFirebase = ({
  config,
}: {
  config: admin.AppOptions | undefined;
}) => {
  admin.initializeApp(config);
  return { firestore: admin.firestore() };
};
