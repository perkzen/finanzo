import React, { forwardRef } from 'react';

interface ToggleProps {
  label: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={'flex flex-col'}>
        <label className="leading-6 text-gray-500 text-sm mt-2">{label}</label>
        <label className={'inline-flex relative items-center cursor-pointer'}>
          <input
            {...props}
            ref={ref}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div
            className={
              'w-11 h-6 bg-primary peer-focus:outline-none  ' +
              'dark:peer-focus:ring-green-800 rounded-full peer dark:bg-secondary ' +
              "peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] " +
              'after:absolute after:top-[2px] after:left-[2px] ' +
              'after:bg-white after:border-gray-300 after:border after:rounded-full ' +
              'after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neutral-800 shadow-md'
            }
          />
        </label>
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';
export default Toggle;
