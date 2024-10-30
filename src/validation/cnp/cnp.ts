import { z } from '../index.ts';
import { ValidationErrorMessages } from '../messages/ValidationErrorMessages.ts';

export const CNP = (value: string) => {
  if (!value || value.length !== 13 || isNaN(Number(value))) {
    return false;
  }

  const genderDigit = parseInt(value.substr(0, 1));
  const year = parseInt(value.substr(1, 2));
  const month = parseInt(value.substr(3, 2));
  const day = parseInt(value.substr(5, 2));
  const uniqueId = parseInt(value.substr(9, 3));
  const controlDigit = parseInt(value.substr(12, 1));

  try {
    if (
      genderDigit < 1 ||
      genderDigit > 8 ||
      (genderDigit === 5 && year > 99) ||
      (genderDigit === 6 && year > 99) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      uniqueId < 1 ||
      uniqueId > 999
    ) {
      return false;
    }

    let yearOfBirth = 0;
    switch (genderDigit) {
      case 1:
      case 2: {
        yearOfBirth = year + 1900;
        break;
      }
      case 3:
      case 4: {
        yearOfBirth = year + 1800;
        break;
      }
      case 5:
      case 6: {
        yearOfBirth = year + 2000;
        break;
      }
      case 7:
      case 8:
      case 9: {
        yearOfBirth = year + 2000;
        if (yearOfBirth > new Date().getFullYear() - 14) {
          yearOfBirth = yearOfBirth - 100;
        }
        break;
      }
      default: {
        break;
      }
    }

    const birthDate = new Date(yearOfBirth, month - 1, day);
    if (birthDate.getFullYear() !== yearOfBirth || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day) {
      return false;
    }

    const controlWeights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let controlSum = 0;
    for (let i = 0; i < 12; i++) {
      controlSum += parseInt(value.charAt(i)) * controlWeights[i];
    }
    const controlResult = controlSum % 11;
    const expectedControlDigit = controlResult === 10 ? 1 : controlResult;

    return expectedControlDigit === controlDigit;
  } catch (error) {
    console.error(error);
  }
};

export const initCnpValidator = () => {
  z.ZodString.prototype.cnp = function () {
    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!CNP(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ValidationErrorMessages.cnp(value),
        });
        return false;
      }
      return true;
    });
  };

  z.ZodEffects.prototype.cnp = function () {
    return this.superRefine((value, ctx) => {
      if (!value) return true;
      if (!CNP(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ValidationErrorMessages.cnp(value),
        });
        return false;
      }
      return true;
    });
  };
};
