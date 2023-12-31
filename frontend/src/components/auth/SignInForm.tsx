import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "../../schema/authSchema";
import InputField from "../ui/InputField";

type FormData = z.infer<typeof SignInSchema>;

const SignInForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
  });

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <InputField
          label="Email address"
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-brand px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-brand/95"
          >
            Get started <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
