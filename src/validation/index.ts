import * as z from 'zod';
import { initPhoneValidation } from './phone/phone.ts';

declare module 'zod' {
  interface ZodString {
    phone(message?: string): ZodString;
    cnp(message?: string): ZodString;
  }
}

export function initValidation() {
  initPhoneValidation();
}

export { z };
