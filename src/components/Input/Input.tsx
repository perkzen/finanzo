import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        <label className="leading-6 text-gray-500 text-sm mt-2">{label}</label>
        <input
          {...props}
          ref={ref}
          className={
            'outline outline-1 shadow-md px-2 py-2 mt-2 outline-neutral-800 rounded-lg w-full'
          }
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
