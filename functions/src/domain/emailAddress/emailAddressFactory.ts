import { EmailAddress } from "./EmailAddress";

export const emailAddressFactory = (value = "email@domain.tld"): EmailAddress =>
  EmailAddress.unsafe_parse(value);
