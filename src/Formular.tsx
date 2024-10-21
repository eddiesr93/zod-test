import {z} from "./validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export default function Form() {
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
      <label>Phone</label>
      <input
        className={'border border-blue-400 rounded'}
        {...register('phone')}
      />
      {typeof errors.phone?.message === 'string' && <p>{errors.phone.message}</p>}
      <input type="submit" />
    </form>
  );
}