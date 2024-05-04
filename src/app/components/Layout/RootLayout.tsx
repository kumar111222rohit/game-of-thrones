import React from 'react';
import { Header } from '../Header/Header';
interface Props {
  children: React.ReactNode;
}
export const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header
        imgSrc="/static/assets/kramp-logo.svg"
        tooltipText="Welcome to Kramp"
        headerText="Game of Thrones"
      />
      {children}
    </>
  );
};
