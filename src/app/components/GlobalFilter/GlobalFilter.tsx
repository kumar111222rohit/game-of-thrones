import React, { useState, useCallback } from 'react';
import { DELAY } from '@/app/constants/genericConstants';
import { debounce } from '@/app/utils/debounce';
import { useTranslation } from 'react-i18next';
import './GlobalFilter.css';

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const { t } = useTranslation();

  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      setFilter(value);
    }, DELAY),
    []
  );

  const onChange = (value: string) => {
    setValue(value);
    debouncedSetFilter(value);
  };

  return (
    <div className="search-box">
      <span>{t('Search Table:')} </span>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;
