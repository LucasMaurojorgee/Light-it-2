import React from "react";

type CheckBoxProps = {
  label: string;
  value: string;
};

export const Radio = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, value, ...props }, ref) => {
    return (
      <fieldset className='mt-4'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <input
              id={label}
              type='radio'
              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
              ref={ref}
              {...props}
              value={value}
            />
            <label className='ml-3 block text-sm font-medium leading-6 text-gray-900'>
              {label}
            </label>
          </div>
        </div>
      </fieldset>
    );
  }
);
