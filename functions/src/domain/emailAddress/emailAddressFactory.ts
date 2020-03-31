import { EmailAddress } from "./EmailAddress";

export const emailAddressFactory = (
  value = "email@domain.tld"
): EmailAddress => {
  return EmailAddress.unsafe_parse(value);
};
