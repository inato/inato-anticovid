import * as admin from "firebase-admin";

export const setupFirestore = ({
  config
}: {
  config: admin.AppOptions | undefined;
}) => {
  admin.initializeApp(config);

  return admin.firestore();
};
