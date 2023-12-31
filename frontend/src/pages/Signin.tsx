import React from "react";
import { z } from "zod";
import SignInForm from "../components/auth/SignInForm";
import SignInHeader from "../components/auth/SignInHeader";
import { useAuth } from "../context/authContext";
import { SignInSchema } from "../schema/authSchema";

type FormData = z.infer<typeof SignInSchema>;

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const onSubmit = async (data: FormData) => {
    await signIn(data);
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <SignInHeader />
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
