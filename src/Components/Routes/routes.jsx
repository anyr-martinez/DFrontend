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
import Filial from "../DFilial/DashboardFilial";

// Dashboards dentro de contabilidad
import DashboardGeneralFilial from "../Plantilla/DashboardContabilidad/GeneralFilial/Content";
import DashboardGeneralCooperativa from "../Plantilla/DashboardContabilidad/GeneralCooperativa/Content";
import DashboardPorFilial from "../Plantilla/DashboardContabilidad/Por_Filial/Content";

//Dashboards dentro de general
import DashboardGeneral from "../Plantilla/DashboardGeneral/GeneralCooperativa/Content";
import DashboardFilial from "../Plantilla/DashboardGeneral/GeneralFiliales/Content";
import PorFilial from "../Plantilla/DashboardGeneral/Filial/Content";

//Dashboard dentro de la filial
import DashboardFilialAsignada from "../Plantilla/DashboardFilial/Filial/Content";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/homeFilial" element={<HomeFilial />} />
      <Route path="/homeGeneral" element={<HomeGeneral />} />
      <Route path="/homeContabilidad" element={<HomeContabilidad />} />

      {/* Contabilidad con subrutas */}
      <Route path="/dashboard-contabilidad" element={<Contabilidad />}>
        <Route path="general-filial" element={<DashboardGeneralFilial />} />
        <Route path="general-cooperativa" element={<DashboardGeneralCooperativa />} />
        <Route path="filial" element ={<DashboardPorFilial />} />
        
      </Route>

      {/* General con subrutas */}
      <Route path="/dashboard-general" element={<General />}>
        <Route path="general-filial" element={<DashboardFilial />} />
        <Route path="general-cooperativa" element={<DashboardGeneral />} />
        <Route path="por-filial" element={<PorFilial />} />
      </Route>

       {/* Filial con subrutas */}
       <Route path="/dashboard-filial" element={<Filial />} >
        <Route path="general-filiales" element={<DashboardFilialAsignada />} />
      </Route>
    </>
  )
);

export default routes;
