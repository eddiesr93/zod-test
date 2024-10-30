import * as z from 'zod';
import { ZodTypeAny } from 'zod';
import { initPhoneValidation } from './phone/phone.ts';
import { initCnpValidator } from './cnp/cnp.ts';
import { initAlphaNumericValidator } from './alphanumeric/alphaNumeric.ts';
import { zodI18nMap } from 'zod-i18n-map';

declare module 'zod' {
  interface ZodString {
    phone(): ZodEffects<this, string, string>;
    cnp(): ZodEffects<this, string, string>;
    alphaNumeric(): ZodEffects<this, string, string>;
  }

  interface ZodEffects<T extends ZodTypeAny, Output = T['_output'], Input = T['_input']> {
    phone(): ZodEffects<this, Output, Input>;
    cnp(): ZodEffects<this, Output, Input>;
    alphaNumeric(): ZodEffects<this, Output, Input>;
  }
}

export function initValidation() {
  initPhoneValidation();
  initCnpValidator();
  initAlphaNumericValidator();
}

z.setErrorMap(zodI18nMap);

export { z };
