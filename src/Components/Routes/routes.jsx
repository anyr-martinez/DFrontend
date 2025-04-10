import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Login
import Login from "../Login/Login";

// Menús principales
import HomeFilial from "../Login/MenuFilial/Home";
import HomeGeneral from "../Login/MenuGeneral/Home";
import HomeContabilidad from "../Login/MenuContabilidad/Home";
import Contabilidad from "../DContabilidad/DashboardContabilidad";
import General from "../DGeneral/DashboardGeneral";

// Dashboards dentro de contabilidad
import DashboardGeneralFilial from "../Plantilla/DashboardContabilidad/GeneralFilial/Content";
import DashboardGeneralCooperativa from "../Plantilla/DashboardContabilidad/GeneralCooperativa/Content";

//Dashboards dentro de general
import DashboardGeneral from "../Plantilla/DashboardGeneral/GeneralCooperativa/Content";
import DashboardFilial from "../Plantilla/DashboardGeneral/GeneralFiliales/Content";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/homeFilial" element={<HomeFilial />} />
      <Route path="/homeGeneral" element={<HomeGeneral />} />
      <Route path="/homeContabilidad" element={<HomeContabilidad />} />

      {/* Contabilidad con subrutas */}
      <Route path="/dashboard-contabilidad" element={<Contabilidad />} >
        <Route path="general-filial" element={<DashboardGeneralFilial />} />
        <Route path="general-cooperativa" element={<DashboardGeneralCooperativa />} />
       
      </Route>
        {/* General con subrutas */}
        <Route path="/dashboard-general" element={<General />} >
        <Route path="general-filial" element={<DashboardFilial />} />
        <Route path="general-cooperativa" element={<DashboardGeneral />} />
       
      </Route>
    </>

  )
);

export default routes;
