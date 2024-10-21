import { z } from './validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Formular() {
  const validationSchema = z.object({
    phone: z.string().phone(),
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
      <label>Telefon</label>
      <input
        className={'border border-blue-400 rounded-md py-1'}
        {...register('phone')}
      />
      <p className={'text-red-500'}>{errors?.phone?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
