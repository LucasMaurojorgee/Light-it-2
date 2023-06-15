import React from "react";

interface inputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  error?: any;
  options?: Array<string>;
}

const Select = React.forwardRef<HTMLSelectElement, inputProps>(
  ({ label, placeholder, type, error, options, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <select
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          {...props}
          ref={ref}
        >
          {options?.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
);

export default Select;
