import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="leading-6 text-gray-500 text-sm mt-2">{label}</label>
      <input
        className={
          'outline outline-1 shadow-md px-2 py-2 mt-2 outline-neutral-800 rounded-lg w-full'
        }
        {...props}
      />
    </div>
  );
};

export default Input;
