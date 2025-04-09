import React from 'react';
import { FilialProvider } from '../Context/filial/FilialContext'; 
import Filial from '../filial/Filial'; 

export const FilialLayout = () => {
  return (
    <FilialProvider>
      <Filial />
    </FilialProvider>
  );
};
