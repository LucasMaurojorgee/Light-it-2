import React from "react";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  error?: any;
  options?: Array<string>;
}

const Input = React.forwardRef<HTMLInputElement, inputProps>(
  ({ label, placeholder, type, error, options, ...props }, ref) => {
    return (
      <div className="p-3">
        <label className="block text-sm font-medium leading-6 text-white">
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            placeholder={placeholder}
            {...props}
            ref={ref}
          />
          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
