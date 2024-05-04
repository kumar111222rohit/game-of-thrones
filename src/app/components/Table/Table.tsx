import React, { useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  RowData,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import './Table.css';

import { useState } from 'react';
import {
  CharacterAge,
  Characters,
  PaginationLinks,
} from '@/app/types/characters';
import { useColumns } from './helper/columnHelper';
import GlobalFilter from '../GlobalFilter/GlobalFilter';
import { ColumnFilter } from '../ColumnFIlter/ColumnFilter';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  characterData?: Characters[];
  charactersWithAgesData: CharacterAge[];
  handleChangePage: (url: string) => void;
  paginationLinks: PaginationLinks;
}

export const Table: React.FC<Props> = ({
  characterData,
  charactersWithAgesData,
  handleChangePage,
  paginationLinks,
}) => {
  const columns = useColumns(charactersWithAgesData);
  const { t } = useTranslation();

  const [data, setData] = useState<Characters[]>(characterData as Characters[]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  useEffect(() => {
    if (characterData) {
      setData(characterData);
    }
  }, [characterData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    // we can also create our custom filter for columns that have array entries
  });

  return (
    <>
      <article className="table-wrapper">
        <table className="table-container">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    <section className="sort-wrapper">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getIsSorted() === 'asc' ? (
                        <span> 🔼</span>
                      ) : (
                        <span> 🔽</span>
                      )}
                    </section>
                    {header.column.getCanFilter() ? (
                      <section>
                        <ColumnFilter column={header.column} />
                      </section>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data to be shown
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="button-wrapper">
            {/* since its a server side pagination and we are already getting 10 items per request from API,
                we can avoid to use the manual pagination of tanstack here */}
            <tr>
              <td>
                <Button
                  btnLabel={t('First')}
                  onClick={() => handleChangePage(paginationLinks.first)}
                  disabled={!paginationLinks.first}
                />
                <Button
                  btnLabel={t('Previous')}
                  onClick={() => handleChangePage(paginationLinks.prev)}
                  disabled={!paginationLinks.prev}
                />
                <Button
                  btnLabel={t('Next')}
                  onClick={() => handleChangePage(paginationLinks.next)}
                  disabled={!paginationLinks.next}
                />
                <Button
                  btnLabel={t('Last')}
                  onClick={() => handleChangePage(paginationLinks.last)}
                  disabled={!paginationLinks.last}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </article>
    </>
  );
};

declare module '@tanstack/react-table' {
  // defining custom properties for our column here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}
