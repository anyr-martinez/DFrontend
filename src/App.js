import React from 'react';
import  routes  from '../src/Components/Routes/routes';
import { RouterProvider } from 'react-router-dom';
import UserState from './Components/Context/user/UserState';
import { FilialProvider } from './Components/Context/filial/FilialContext';  
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
