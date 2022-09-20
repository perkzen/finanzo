import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  classNames?: string;
}

const Button: FC<ButtonProps> = ({ label, classNames, ...props }) => {
  return (
    <button
      className={
        'rounded-md border border-transparent bg-neutral-800 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ' +
        classNames
      }
      {...props}
    >
      {label}
    </button>
  );
};
export default Button;
