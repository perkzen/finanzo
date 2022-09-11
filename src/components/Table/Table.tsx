import React from 'react';
import classes from './Table.module.scss';
import { classNames } from '../../utils/classNames';
import { AiFillDelete } from 'react-icons/ai';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EmptyTable from './EmptyTable/EmptyTable';

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
  isLoading?: boolean;
  showHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  buttonLabel?: string;
  buttonAction?: () => void;
}

const Table = <T,>({
  data,
  headers,
  title,
  onRowClick,
  onDelete,
  isLoading,
  align,
  buttonAction,
  buttonLabel,
  showHeader = true,
}: TableProps<T>) => {
  return (
    <>
      <h1 className={'text-2xl text-center font-bold my-2'}>{title}</h1>
      <div>
        {buttonLabel && <button onClick={buttonAction}>{buttonLabel}</button>}
      </div>
      <div
        className={classNames(classes.Container as string, 'overflow-x-auto')}
      >
        <table className="w-full">
          <thead>
            {showHeader && (
              <tr>
                {headers.map(({ label }) => (
                  <th key={label}>{label}</th>
                ))}
                {onDelete && <th />}
              </tr>
            )}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={headers.length + 1}>
                  <div
                    className={
                      'flex flex-col justify-center items-center h-[100px]'
                    }
                  >
                    <LoadingSpinner width={'8'} height={'8'} />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    {data.map((dataItem, index) => (
                      <tr
                        className={
                          onRowClick &&
                          'hover:cursor-pointer hover:bg-primary hover:shadow-sm'
                        }
                        key={index}
                        onClick={() => onRowClick && onRowClick(dataItem)}
                      >
                        {headers.map((header, index) => (
                          <td key={index} align={align}>
                            {dataItem[header.accessor] as unknown as string}
                          </td>
                        ))}
                        {onDelete && (
                          <td>
                            <button onClick={() => onDelete(dataItem)}>
                              <AiFillDelete className={'text-red-600'} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={headers.length + 1}>
                      <EmptyTable />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
