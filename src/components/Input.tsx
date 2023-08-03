import React, { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  placeholder?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, ...props }, ref) => {
    return (
      <div className='p-3 m-0'>
        <label className='block text-base font-medium leading-6 text-gray-900'>
          {label}
        </label>
        <div className='mt-2'>
          <input
            type='text'
            className='block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 h-9 w-full'
            placeholder={placeholder}
            {...props}
            ref={ref}
          />
          {error && <p className='text-red-600 pt-1'>{error}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
