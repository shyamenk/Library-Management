import { InputHTMLAttributes, forwardRef } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, id, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="text-base font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-gray-700"
          id={id}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default InputField;
