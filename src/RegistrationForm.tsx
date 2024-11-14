import { z } from './validation';
import { FieldError, FieldErrors, FieldValues, Resolver, useForm } from 'react-hook-form';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

function toFieldErrors<T extends FieldValues>(error: ZodError<T>): FieldErrors<T> {
  const fieldErrors: FieldErrors<T> = {};

  const flattened = error.flatten();
  const fieldErrorEntries = Object.entries(flattened.fieldErrors) as [string, string[]][];

  fieldErrorEntries.forEach(([key, messages]) => {
    if (messages.length > 0) {
      const fieldError: FieldError = {
        message: messages[0],
        type: 'validation',
      };

      fieldErrors[key as keyof T] = fieldError as FieldErrors<T>[keyof T];
    }
  });

  return fieldErrors;
}

type A<TFormData extends FieldValues> = (form: TFormData) => ZodObject<ZodRawShape>;

const customZodResolver = <TFormData extends FieldValues>(customResolver: A<TFormData>): Resolver<TFormData> => {
  return async (form: TFormData) => {
    const schema = customResolver(form);
    try {
      const result = await schema.parseAsync(form);
      return {
        values: result,
        errors: {},
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          values: {},
          errors: toFieldErrors(error),
        };
      }
      throw error;
    }
  };
};

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
  age: number;
  email: string;
  newsletterOptIn: boolean;
  referralCode?: string;
};

export default function RegistrationForm() {
  const baseSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
    age: z.number().min(18),
    email: z.string().email(),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    mode: 'onChange',
    // resolver: async (form): Promise<ResolverResult<FormData>> => {
    //   const newValidationSchema = baseSchema.extend({
    //     newsletterOptIn: z.boolean(),
    //     referralCode: form.newsletterOptIn ? z.string().min(1) : z.string().optional(),
    //   });
    //
    //   try {
    //     const result = await newValidationSchema.parseAsync(form);
    //     return {
    //       values: result,
    //       errors: {},
    //     };
    //   } catch (error) {
    //     if (error instanceof ZodError) {
    //       return {
    //         values: {},
    //         errors: toFieldErrors(error),
    //       };
    //     }
    //     throw error;
    //   }
    // },
    resolver: customZodResolver((form) => {
      return baseSchema.extend({
        newsletterOptIn: z.boolean(),
        referralCode: form.newsletterOptIn ? z.string().min(1) : z.string().optional(),
      });
    }),
  });

  const submit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      className={'py-10 px-20 flex flex-col gap-3'}
      onSubmit={handleSubmit(submit)}>
      <label>Username</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('username')}
      />
      <p className={'text-red-500'}>{errors?.username?.message}</p>
      <label>Password</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('password')}
      />
      <p className={'text-red-500'}>{errors?.password?.message}</p>
      <label>Confirm Password</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('confirmPassword')}
      />
      <p className={'text-red-500'}>{errors?.confirmPassword?.message}</p>
      <label>Age</label>
      <input
        type={'number'}
        className={'border border-blue-400 rounded-md py-1'}
        {...register('age', { valueAsNumber: true })}
      />
      <p className={'text-red-500'}>{errors?.age?.message}</p>
      <label>Email</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('email')}
      />
      <p className={'text-red-500'}>{errors?.email?.message}</p>
      <label>Newsletter Opt In</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        type="checkbox"
        {...register('newsletterOptIn')}
      />
      <p className={'text-red-500'}>{errors?.newsletterOptIn?.message}</p>
      <label>Referral Code</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('referralCode')}
      />
      <p className={'text-red-500'}>{errors?.referralCode?.message}</p>
      <button
        className={'bg-blue-500 text-white rounded-md py-1'}
        type="submit">
        Submit
      </button>
    </form>
  );
}
