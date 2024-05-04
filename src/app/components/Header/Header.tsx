import React from 'react';
import Image from 'next/image';

import './Header.css';
import { Tooltip } from '../Tooltip/Tooltip';

interface Props {
  headerText?: string;
  tooltipText?: string;
  imgSrc?: string;
  altText?: string;
}
export const Header: React.FC<Props> = ({
  headerText,
  tooltipText,
  imgSrc,
  altText,
}) => {
  return (
    <article className="header-container">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={altText || ''}
          width={100}
          height={24}
          priority
        />
      )}
      <Tooltip text={`${tooltipText}`}>
        <section
          className="header-label"
          aria-label={`Header with text ${headerText}`}
          data-testid="header-text"
        >
          {headerText}
        </section>
      </Tooltip>
    </article>
  );
};
