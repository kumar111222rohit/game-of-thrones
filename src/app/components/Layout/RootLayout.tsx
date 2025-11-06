import React from 'react';
import { Header } from '../Header/Header';
interface Props {
  children: React.ReactNode;
}
export const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header
        headerText="Game of Thrones"
      />
      {children}
    </>
  );
};
