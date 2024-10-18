import * as z from 'zod';
import { initPhoneValidation } from './phone/phone.ts';

declare module 'zod' {
  interface ZodString {
    phone(message?: string): ZodString;
  }
}

initPhoneValidation();

export { z };
