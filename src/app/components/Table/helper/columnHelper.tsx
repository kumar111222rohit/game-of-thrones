import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { CharacterAge, Characters } from '@/app/types/characters';

const columnHelper = createColumnHelper<Characters>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useColumns = (charactersWithAgesData: CharacterAge[]) => {
  const { t } = useTranslation();

  const generateHeader = (labelKey: string) => (
    <div className="column-container" aria-label={labelKey}>
      <span className="table-header-label">{t(labelKey)}</span>
    </div>
  );

  const generateCellInfo = (items: string[]) => {
    return (
      <div>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  };
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => generateHeader('Name'),
        cell: info => info.getValue(),
        sortingFn: 'alphanumeric',
        filterFn: 'includesString',
      }),
      columnHelper.accessor('gender', {
        header: () => generateHeader('Gender'),
        cell: info => info.getValue(),
        meta: {
          filterVariant: 'select',
        },
        filterFn: 'includesStringSensitive',
      }),
      columnHelper.accessor('culture', {
        header: () => generateHeader('Culture'),
        cell: info => info.getValue(),
        filterFn: 'includesString',
      }),
      columnHelper.accessor('born', {
        header: () => generateHeader('Born'),
        cell: info => info.getValue(),
        filterFn: 'includesString',
      }),
      columnHelper.accessor('playedBy', {
        header: () => generateHeader('Played By'),
        cell: info => info.getValue(),
        filterFn: 'arrIncludes',
      }),
      columnHelper.accessor('aliases', {
        header: () => generateHeader('Aliases'),
        cell: info => generateCellInfo(info.getValue()),
        filterFn: 'arrIncludes',
      }),
      columnHelper.accessor('books', {
        header: () => generateHeader('Books'),
        cell: info => generateCellInfo(info.getValue()),
        filterFn: 'arrIncludes',
      }),
      columnHelper.accessor('titles', {
        header: () => generateHeader('Title'),
        cell: info => generateCellInfo(info.getValue()),
        filterFn: 'arrIncludes',
      }),
      //  this is how we will be fetching and showing the age of a character in an async manner for the table
      // columnHelper.accessor('ages', {
      //   header: () => generateHeader('Age'),
      //   cell: info => charactersWithAgesData[info.row.original.name] || 'Loading...',
      // }),
    ],
    [t]
  );

  return columns;
};
