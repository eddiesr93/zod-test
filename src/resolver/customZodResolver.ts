import { FieldError, FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

function toFieldErrors<T extends FieldValues>(error: ZodError<T>): FieldErrors<T> {
  const fieldErrors: FieldErrors<T> = {};

  // Flatten errors for easier parsing
  const flattened = error.flatten();
  const fieldErrorEntries = Object.entries(flattened.fieldErrors) as [string, string[]][];

  // Iterate and create field error objects
  fieldErrorEntries.forEach(([key, messages]) => {
    if (messages.length > 0) {
      const fieldError: FieldError = {
        message: messages[0], // Take the first error message
        type: 'validation',
      };
      fieldErrors[key as keyof T] = fieldError as FieldErrors<T>[keyof T];
    }
  });

  return fieldErrors;
}

type CustomZodResolverType<TFormData extends FieldValues> =
  | ZodObject<ZodRawShape>
  | ((form: TFormData) => ZodObject<ZodRawShape>);

type CustomZodResolverOptions = {
  mode?: 'sync' | 'async';
  validateAllFieldCriteria?: boolean;
};

export const customZodResolver = <TFormData extends FieldValues>(
  customResolver: CustomZodResolverType<TFormData>,
  options: CustomZodResolverOptions = {
    mode: 'async',
    validateAllFieldCriteria: false,
  }
): Resolver<TFormData> => {
  return async (form: TFormData) => {
    const schema = typeof customResolver === 'function' ? customResolver(form) : customResolver;

    try {
      const result = options.mode === 'sync' ? schema.parse(form) : await schema.parseAsync(form);

      return {
        values: result,
        errors: {},
      };
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = toFieldErrors(error);

        if (options.validateAllFieldCriteria) {
          error.errors.forEach((issue) => {
            const path = issue.path.join('.');
            if (path && errors[path]) {
              const currentError = errors[path];
              currentError.types = currentError.types || {};
              (currentError.types as Record<string, string>)[issue.code] = issue.message;
            }
          });
        }

        return {
          values: {},
          errors,
        };
      }
      throw error;
    }
  };
};
