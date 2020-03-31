/* tslint:disable:no-empty */

import * as functions from "firebase-functions";

export const responseFactory = ({
  send = () => {}
}: Partial<{
  send: (response: string) => void;
}> = {}) => ({ send } as functions.Response);
