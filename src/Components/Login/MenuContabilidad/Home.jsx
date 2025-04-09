import React from "react";
import { Outlet } from 'react-router-dom';
import Aside from "../../Plantilla/MenuContabilidad/Aside";
import Header from "../../Plantilla/MenuContabilidad/Header";
import Footer  from "../../Plantilla/MenuContabilidad/Footer";
import Content  from "../../Plantilla/MenuContabilidad/Content";

const Home = () => {
  return (
    <div className="wrapper">
      <Header/>
      <Aside/>
      <Outlet />
      <Content />
      <Footer/>
  </div>

  );
};

export default Home;
