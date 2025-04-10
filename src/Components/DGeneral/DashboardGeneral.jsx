import React from 'react';
import Header from '../Plantilla/MenuGeneral/Header';
import { Outlet } from 'react-router-dom';
import Aside from '../Plantilla/MenuGeneral/Aside';
import Footer from '../Plantilla/MenuGeneral/Footer';

const General = ()  => {
  return (
    <div className='wrapper'>
        <Header />
        <Outlet />       
        <Aside />
        <Footer />     
    </div>
  );
}

export default General;
