import React from "react";

type checkBoxProps = {
  label: string;
  text: string;
  error: any;
  value: string;
};

export const Radious = React.forwardRef<HTMLInputElement, checkBoxProps>(
  ({ label, error, text, value, ...props }, ref) => {
    return (
      <>
        <div>
          <fieldset className='mt-4'>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <input
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
        </div>
        {error && <p className='text-red-600'>{error.gender}</p>}
      </>
    );
  }
);
