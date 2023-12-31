import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const SignInHeader: React.FC = () => (
  <>
    <div className="flex justify-center mb-2">
      <img src={Logo} alt="logo" />
    </div>
    <h2 className="text-2xl font-bold leading-tight text-center text-black">
      Sign in to your account
    </h2>
    <p className="mt-2 text-sm text-center text-gray-600 ">
      Don&apos;t have an account?
      <Link
        to="/signup"
        className="font-semibold transition-all duration-200 text-grey-800 hover:underline"
      >
        {""} Create a free account
      </Link>
    </p>
  </>
);

export default SignInHeader;
