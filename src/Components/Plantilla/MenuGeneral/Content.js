import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png"; 

export default function Content() {
  return (
    <div className="content-wrapper" style={{ backgroundColor: "#F0F0E6" }}>
      {/* Content Header */}
      <div className="content-header d-flex justify-content-center" style={{ height: "30vh" }}>
        {/* Contenedor de la imagen */}
        <div
          style={{
            height: "100%",  
            width: "100%",  
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",  
            backgroundPosition: "center",  
            backgroundRepeat: "no-repeat",  
            marginTop: "23vh", 
          }}
        ></div>
      </div>

      {/* Main Content */}
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          {/* Opciones del Menú */}
          <div className="row g-4 justify-content-center">
            {/* Aquí puedes agregar más contenido si es necesario */}
          </div>
        </div>
      </section>
    </div>
  );
}
