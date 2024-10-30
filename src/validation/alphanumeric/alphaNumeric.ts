import { ValidationErrorMessages } from '../messages/ValidationErrorMessages.ts';
import { z } from '../index.ts';

export const initAlphaNumericValidator = () => {
  z.ZodString.prototype.alphaNumeric = function () {
    const alphaNumericRegex = /^[a-zA-Z0-9]*$/;

    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!alphaNumericRegex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ValidationErrorMessages.alphaNumeric(value),
        });
        return false;
      }
      return true;
    });
  };

  z.ZodEffects.prototype.alphaNumeric = function () {
    const alphaNumericRegex = /^[a-zA-Z0-9]*$/;
    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!alphaNumericRegex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ValidationErrorMessages.alphaNumeric(value),
        });
        return false;
      }
      return true;
    });
  };
};
