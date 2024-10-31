import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from './validation';

export default function Formular() {
  const baseSchema = z.object({
    name: z.string().optional(),
    lastName: z.string().optional(),
    role: z.union([z.literal('admin'), z.literal('user')]),
    phone: z.string().optional(),
    alphaNumeric: z.string().alphaNumeric(),
    cnp: z.string().optional(),
  });

  const validationSchema = baseSchema.superRefine((form, ctx) => {
    if (form.role === 'user') {
      if (!form.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "User's name is required",
          path: ['name'],
        });
      }
      if (!form.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "User's last name is required",
          path: ['lastName'],
        });
      }
      if (!form.cnp || !z.string().cnp().safeParse(form.cnp).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "User's CNP is required and must be valid",
          path: ['cnp'],
        });
      }
    }
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const submit = (data: z.infer<typeof validationSchema>) => {
    console.log(data);
  };

  return (
    <form
      className={'py-10 px-20 flex flex-col gap-3'}
      onSubmit={handleSubmit(submit)}>
      <label>Role</label>
      <select
        className={'border border-blue-400 rounded-md py-1'}
        {...register('role')}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <p className={'text-red-500'}>{errors?.role?.message}</p>
      <label>Nume</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('lastName')}
      />
      <p className={'text-red-500'}>{errors?.lastName?.message}</p>
      <label>Prenume</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('name')}
      />
      <p className={'text-red-500'}>{errors?.name?.message}</p>
      <label>Telefon</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('phone')}
      />
      <p className={'text-red-500'}>{errors?.phone?.message}</p>
      <label>CNP</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('cnp')}
      />
      <p className={'text-red-500'}>{errors?.cnp?.message}</p>
      <label>Alphanumeric</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('alphaNumeric')}
      />
      <p className={'text-red-500'}>{errors?.alphaNumeric?.message}</p>
      <button
        className={'bg-blue-500 p-2 rounded-md text-white'}
        type="submit">
        Submit
      </button>
    </form>
  );
}
