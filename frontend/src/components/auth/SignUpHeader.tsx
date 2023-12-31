import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const SignUpHeader: React.FC = () => (
  <>
    <div className="flex justify-center mb-2">
      <img src={Logo} alt="logo" />
    </div>
    <h2 className="text-2xl font-bold leading-tight text-center text-black">
      Sign up to create account
    </h2>
    <p className="mt-2 text-base text-center text-gray-600">
      Already have an account?
      <Link
        to="/signin"
        className="font-medium text-black transition-all duration-200 hover:underline"
      >
        Sign In
      </Link>
    </p>
  </>
);

export default SignUpHeader;
