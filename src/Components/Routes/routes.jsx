import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// RUTAS DE LOGEO
import Login from "../Login/Login";

// RUTAS PARA LOS MENUS
import HomeFilial from "../Login/MenuFilial/Home";
import HomeGeneral from "../Login/MenuGeneral/Home";
import HomeContabilidad from "../Login/MenuContabilidad/Home";

// Rutas de la aplicación
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/HomeFilial" element={<HomeFilial />} />
      <Route path="/HomeGeneral" element={<HomeGeneral />} />
      <Route path="/HomeContabilidad" element={<HomeContabilidad />} />
    </Route>
  )
);
