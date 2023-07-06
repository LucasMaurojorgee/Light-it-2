import React from "react";

interface inputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  error?: any;
  options?: Array<string>;
  width: string;
}

const Select = React.forwardRef<HTMLSelectElement, inputProps>(
  ({ label, placeholder, type, error, options, width, ...props }, ref) => {
    return (
      <>
        <div className='p-3'>
          <label className='block text-base font-medium leading-6 text-gray-900'>
            {label}
          </label>
          <select
            className={`mt-2 block w-${width} rounded-md border-0 p-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder={placeholder}
            {...props}
            ref={ref}
          >
            <option value=''>{placeholder}</option>
            {options?.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {error && <p className='text-red-600 pt-1'>{error.message}</p>}
        </div>
      </>
    );
  }
);

export default Select;
