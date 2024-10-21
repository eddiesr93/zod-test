import * as z from 'zod';
import { initPhoneValidation } from './phone/phone.ts';
import { initCnpValidator } from './cnp/cnp.ts';

declare module 'zod' {
  interface ZodString {
    phone(message?: string): ZodString;
    cnp(message?: string): ZodString;
  }
}

export function initValidation() {
  initPhoneValidation();
  initCnpValidator();
}

export { z };
