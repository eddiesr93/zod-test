import * as z from 'zod';
import { ValidationErrorMessages } from '../messages/ValidationErrorMessages.ts';

export const initAlphaNumericValidator = () => {
  z.ZodString.prototype.alphaNumeric = function (): z.ZodString {
    const alphaNumericRegex = /^[a-zA-Z0-9]*$/;

    return this.refine(
      (value) => {
        if (!value) return true;
        return alphaNumericRegex.test(value);
      },
      (value) => {
        return {
          message: ValidationErrorMessages.alphaNumeric(value),
        };
      }
    ) as unknown as z.ZodString;
  };
};
