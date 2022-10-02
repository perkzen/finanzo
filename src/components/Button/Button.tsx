import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  classNames?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, classNames, ...props }, ref) => {
    return (
      <button
        className={
          'rounded-md border border-transparent bg-neutral-800 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 ' +
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 disabled:bg-neutral-700 disabled:cursor-not-allowed ' +
          classNames
        }
        {...props}
        ref={ref}
      >
        {label}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;
