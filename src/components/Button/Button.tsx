import React, { ButtonHTMLAttributes, FC } from 'react';

type color = 'blue' | 'red';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: color;
  label: string;
}

const Button: FC<ButtonProps> = ({ color, label, ...props }) => {
  return (
    <button
      className={`rounded-md border border-transparent bg-${color}-100 px-3 py-2 text-sm font-medium text-${color}-900 hover:bg-${color}-200 
      focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}-500 focus-visible:ring-offset-2`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
