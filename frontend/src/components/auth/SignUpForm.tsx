import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignUpSchema } from "../../schema/authSchema";
import InputField from "../ui/InputField";

type FormData = z.infer<typeof SignUpSchema>;

const SignUpForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <InputField label="Name" id="name" type="text" placeholder="Name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <InputField
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

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

        <InputField
          label="Contact Number"
          id="contactNumber"
          type="text"
          placeholder="Contact Number"
          {...register("contactNumber")}
        />
        {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}

        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-brand px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-brand/95"
          >
            Create Account <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
