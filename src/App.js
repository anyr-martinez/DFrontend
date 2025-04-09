import React from 'react';
import { routes } from './Components/Routes/routes';
import { RouterProvider } from 'react-router-dom';
import UserState from './Components/Context/user/UserState';
import { FilialProvider } from './Components/Context/filial/FilialContext';  // Importar el proveedor del contexto Filial
import Modal from 'react-modal';

// Definir el elemento 'app' de la aplicación
Modal.setAppElement('#root');

function App() {
  return (
    <UserState>
      <FilialProvider> {/* Aquí agregamos el FilialProvider */}
        <RouterProvider router={routes} />
      </FilialProvider>
    </UserState>
  );
}

export default App;
