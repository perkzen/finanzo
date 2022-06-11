import React from 'react';
import classes from './Table.module.scss';
import { classNames } from '../../utils/classNames';

export interface TableHeader<T> {
  label: string;
  accessor: keyof T;
}

interface TableProps<T> {
  data: T[];
  headers: TableHeader<T>[];
  title?: string;
  onRowClick?: (item: T) => void;
}

const Table = <T,>({ data, headers, title, onRowClick }: TableProps<T>) => {
  return (
    <>
      <h1 className={'text-2xl text-center font-bold my-2'}>{title}</h1>
      <div
        className={classNames(classes.Container as string, 'overflow-x-auto')}
      >
        <table className=" table shadow w-full">
          <thead>
            <tr>
              {headers.map(({ label }) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((dataItem, index) => (
              <tr
                className={onRowClick && 'hover:cursor-pointer hover'}
                key={index}
                onClick={() => onRowClick && onRowClick(dataItem)}
              >
                {headers.map((header, index) => (
                  <td key={index}>
                    {dataItem[header.accessor] as unknown as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
