import { z } from './validation';
import { useForm } from 'react-hook-form';
import { customZodResolver } from './resolver/customZodResolver';

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
    // resolver: customZodResolver(baseSchema),
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
