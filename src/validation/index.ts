import * as z from 'zod';
import { initPhoneValidation } from './phone/phone.ts';
import { initCnpValidator } from './cnp/cnp.ts';
import { initAlphaNumericValidator } from './alphanumeric/alphaNumeric.ts';
import { zodI18nMap } from 'zod-i18n-map';

declare module 'zod' {
  interface ZodString {
    phone(message?: string): ZodString;
    cnp(message?: string): ZodString;
    alphaNumeric(message?: string): ZodString;
  }
}

export function initValidation() {
  initPhoneValidation();
  initCnpValidator();
  initAlphaNumericValidator();
}

z.setErrorMap(zodI18nMap);

export { z };
