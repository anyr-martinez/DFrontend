import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const FilialContext = createContext();

// Proveedor para envolver la aplicación
export const FilialProvider = ({ children }) => {
  const [filial, setFilial] = useState(null);

  useEffect(() => {
    // Aquí puedes cargar la filial desde la API si es necesario
    const storedFilial = JSON.parse(localStorage.getItem('filial')); // Si la filial está almacenada
    setFilial(storedFilial); // Asignar la filial al estado
  }, []);

  return (
    <FilialContext.Provider value={{ filial, setFilial }}>
      {children}
    </FilialContext.Provider>
  );
};

// Hook para usar el contexto
export const useContextFilial = () => {
  return useContext(FilialContext);
};
