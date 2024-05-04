import React, { useState, useCallback } from 'react';

import { DELAY } from '@/app/constants/genericConstants';
import { debounce } from '@/app/utils/debounce';

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<string | number>(initialValue);

  const debouncedOnChange = useCallback(
    debounce((newValue: string | number) => {
      onChange(newValue);
    }, DELAY),
    [onChange, debounce]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedOnChange(newValue);
  };

  return <input {...props} value={value} onChange={handleChange} />;
};

export default DebouncedInput;
