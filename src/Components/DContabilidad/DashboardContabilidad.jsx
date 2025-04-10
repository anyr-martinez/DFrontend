import React from 'react';
import Header from '../Plantilla/MenuContabilidad/Header';
import { Outlet } from 'react-router-dom';
import Aside from '../Plantilla/MenuContabilidad/Aside';
import Footer from '../Plantilla/MenuContabilidad/Footer';

const Contabilidad = ()  => {
  return (
    <div className='wrapper'>
        <Header />
        <Outlet />       
        <Aside />
        <Footer />     
    </div>
  );
}

export default Contabilidad;
