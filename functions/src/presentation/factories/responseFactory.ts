/* tslint:disable:no-empty */

import * as functions from "firebase-functions";

export const responseFactory = ({
  send = () => {},
  status = () => ({
    send: () => {}
  }),
  sendStatus = () => {}
}: Partial<{
  send: (response: string) => void;
  status: (status: number) => { send: (response: string) => void };
  sendStatus: (status: number) => void;
}> = {}) => ({ send, status, sendStatus } as functions.Response);
