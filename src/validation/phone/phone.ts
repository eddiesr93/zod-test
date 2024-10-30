import { ValidationErrorMessages } from '../messages/ValidationErrorMessages.ts';
import { ZodIssueCode } from 'zod';
import { z } from '../index.ts';

export const initPhoneValidation = () => {
  const phoneRegex =
    /^(?:\+|00)?(4)?(07[0-9]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;

  z.ZodString.prototype.phone = function () {
    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!phoneRegex.test(value)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: ValidationErrorMessages.phone(value),
        });
        return false;
      }
      return true;
    });
  };

  z.ZodEffects.prototype.phone = function () {
    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!phoneRegex.test(value)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: ValidationErrorMessages.phone(value),
        });
        return false;
      }
      return true;
    });
  };
};
