import React from 'react';

import './Button.css';

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  btnLabel: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  ariaLabel?: string;
  dataTestId?: string;
}
export const Button: React.FC<Props> = ({
  onClick,
  btnLabel,
  type,
  disabled,
  ariaLabel = '',
  dataTestId,
}) => {
  return (
    <button
      className="submit-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {btnLabel}
    </button>
  );
};
