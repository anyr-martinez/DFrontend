import React from "react";
import { Outlet } from 'react-router-dom';
import Aside from "../../Plantilla/MenuFilial/Aside";
import Header from "../../Plantilla/MenuFilial/Header";
import Footer  from "../../Plantilla/MenuFilial/Footer";
import Content  from "../../Plantilla/MenuFilial/Content";

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
