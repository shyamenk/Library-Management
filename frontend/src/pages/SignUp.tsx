import { z } from "zod";
import SignUpForm from "../components/auth/SignUpForm";
import SignUpHeader from "../components/auth/SignUpHeader";
import { useAuth } from "../context/authContext";
import { SignUpSchema } from "../schema/authSchema";

type FormData = z.infer<typeof SignUpSchema>;

const SignUp: React.FC = () => {
  const { signUp } = useAuth();

  const onSubmit = (data: FormData) => {
    signUp(data);
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <SignUpHeader />
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
