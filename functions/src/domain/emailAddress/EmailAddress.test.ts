import { EmailAddress } from './EmailAddress';
import { emailAddressFactory } from './emailAddressFactory';

describe('EmailAddress', () => {
  describe('tryParse', () => {
    it('should return left when the provided value is not a valid email address', () => {
      const emailAddress = EmailAddress.tryParse('invalid');
      expect(emailAddress.isLeft()).toBe(true);
    });

    it('should return right when the provided value is a valid email address', () => {
      const emailAddress = EmailAddress.tryParse('valid@topLevelDomain');
      expect(emailAddress.isRight()).toBe(true);
    });

    it('should return right when the provided value is a valid email address', () => {
      const emailAddress = EmailAddress.tryParse('valid@domain.tld');
      expect(emailAddress.isRight()).toBe(true);
    });

    it('should trim the provided email address', () => {
      const emailAddress = EmailAddress.tryParse(' valid@domain.tld ');
      expect(
        emailAddress.mapRight(email => email.toString()).getOrElse(() => ''),
      ).toBe('valid@domain.tld');
    });
  });

  describe('unsafe_parse', () => {
    it('should throw an error if the provided value is not a valid email address', () => {
      expect(() => EmailAddress.unsafe_parse('invalid')).toThrow();
    });

    it('should return an EmailAddress object if the provided value is a valid email address', () => {
      const emailAddress = EmailAddress.unsafe_parse('valid@domain.tld');
      expect(emailAddress.toString()).toEqual('valid@domain.tld');
    });
  });

  describe('equals', () => {
    it('should return true if both email address are equal', () => {
      const emailAddress = emailAddressFactory('email@inato.com');
      const equalEmailAddress = emailAddressFactory('email@inato.com');
      expect(emailAddress.equals(equalEmailAddress)).toBe(true);
    });

    it('should return false if both email address are different', () => {
      const emailAddress = emailAddressFactory('email@inato.com');
      const differentEmailAddress = emailAddressFactory(
        'differentEmail@inato.com',
      );
      expect(emailAddress.equals(differentEmailAddress)).toBe(false);
    });

    it('should return true if both email address are equal with case insensitivity', () => {
      const emailAddress = emailAddressFactory('email@inato.com');
      const equalEmailAddress = emailAddressFactory('eMail@inato.com');
      expect(emailAddress.equals(equalEmailAddress)).toBe(true);
    });
  });
});
