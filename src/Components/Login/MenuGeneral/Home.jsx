import React from "react";
import { Outlet } from 'react-router-dom';
import Aside from "../../Plantilla/MenuGeneral/Aside";
import Header from "../../Plantilla/MenuGeneral/Header";
import Footer  from "../../Plantilla/MenuGeneral/Footer";
import Content  from "../../Plantilla/MenuGeneral/Content";

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
