export interface APIService {
  subscribeToUpdates(attributes: {
    email: string;
    filters: { [key: string]: string | ReadonlyArray<string> | undefined };
  }): Promise<boolean>;
  subscribeToNewsletter(attributes: { email: string }): Promise<boolean>;
}
