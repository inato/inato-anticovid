import qs from 'qs';

import { APIService } from '../../application';
import config from '../../config';

export class FetchAPIService implements APIService {
  async subscribeToUpdates({
    email,
    filters,
  }: {
    email: string;
    filters: { [key: string]: string | ReadonlyArray<string> | undefined };
  }) {
    const queryString = {
      email,
      ...filters,
    };
    const response = await fetch(
      `${config.baseApiUrl}/subscribeToUpdates?${qs.stringify(queryString)}`,
    );

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  }

  async subscribeToNewsletter({ email }: { email: string }) {
    const response = await fetch(config.emailSubscribeHookUrl, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  }
}
