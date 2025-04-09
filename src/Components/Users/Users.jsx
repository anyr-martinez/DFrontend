import React from 'react'
import Header from '../Plantilla/MenuFilial/Header'
import { Outlet } from 'react-router-dom'
import Aside from '../Plantilla/MenuFilial/Aside'
import Footer from '../Plantilla/MenuFilial/Footer'

const Users = ()  => {
  return (
    <div className='wrapper'>
        <Header />
        <Outlet />
        <Aside />
        <Footer />     
    </div>
  );
}

export default Users;
