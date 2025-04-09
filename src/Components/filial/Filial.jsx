import React from 'react';
import Header from '../Plantilla/MenuFilial/Header';
import { Outlet } from 'react-router-dom';
import Aside from '../Plantilla/MenuFilial/Aside';
import Content from '../Plantilla/MenuFilial/Content';
import Footer from '../Plantilla/MenuFilial/Footer';

const Filial = ()  => {
  return (
    <div className='wrapper'>
        <Header />
        <Outlet />
        <Content />
        <Aside />
        <Footer />     
    </div>
  );
}

export default Filial;
