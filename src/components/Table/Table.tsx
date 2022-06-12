import React from 'react';
import classes from './Table.module.scss';
import { classNames } from '../../utils/classNames';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';

export interface TableHeader<T> {
  label: string;
  accessor: keyof T;
}

interface TableProps<T> {
  data: T[];
  headers: TableHeader<T>[];
  title?: string;
  onRowClick?: (item: T) => void;
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
}

const Table = <T,>({
  data,
  headers,
  title,
  onRowClick,
  onDelete,
  onEdit,
}: TableProps<T>) => {
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
              {onDelete && <th />}
              {onEdit && <th />}
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

                {onEdit && (
                  <td>
                    <button onClick={() => onEdit && onEdit(dataItem)}>
                      <AiTwotoneEdit className={'text-green-600'} />
                    </button>
                  </td>
                )}
                {onDelete && (
                  <td>
                    <button onClick={() => onDelete(dataItem)}>
                      <AiFillDelete className={'text-red-600'} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
