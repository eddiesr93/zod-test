import * as z from "zod";


export const initPhoneValidation = () => {
  z.ZodString.prototype.phone = function (message =  'Invalid phone number'): z.ZodString {
    const phoneRegex = /^(?:\+|00)?(4)?(07[0-9]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
    return this.refine((value) => {
      if (!value) return true;
      return phoneRegex.test(value);
    }, {
      message,
    })  as unknown as z.ZodString;
  };
}
