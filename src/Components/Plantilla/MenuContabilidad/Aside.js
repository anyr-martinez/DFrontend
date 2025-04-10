import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mostrarAlertaPregunta } from "../../SweetAlert/SweetAlert";
import dashboard from "../../../assets/images/dashboard.png";
import { useContextFilial } from "../../Context/filial/FilialContext";

const Aside = () => {
  const [finanzasOpen, setFinanzasOpen] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [filialesList, setFilialesList] = useState([]);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { ObtenerFiliales } = useContextFilial();

  useEffect(() => {
    const fetchFiliales = async () => {
      try {
        const allFiliales = await ObtenerFiliales();
        setFilialesList(allFiliales);
      } catch (error) {
        console.error("Error al obtener filiales:", error);
      }
    };

    fetchFiliales();
  }, [ObtenerFiliales]);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFilial");
    e.preventDefault();
    mostrarAlertaPregunta(
      (confirmed) => {
        if (confirmed) {
          navigate("/");
        }
      },
      "¿Está seguro que desea Cerrar Sesión?",
      "question"
    );
  };

  const handleMouseEnter = (id) => setHovered(id);
  const handleMouseLeave = () => setHovered(null); 

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column"
      style={{ backgroundColor: "#E0E0D6" }}
    >
      {/* Logo */}
      <div
        className="brand-link d-flex flex-column align-items-center justify-content-center p-3"
        style={{
          backgroundColor: "#F0F0E6",
          color: "#212529",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "6px solid #007236",
        }}
      >
        <img
          src={dashboard}
          className="img-circle elevation-3"
          alt="Logo"
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "10px",
            border: "3px solid #007236",
            padding: "1px",
            backgroundColor: "#F0F0E6",
            borderRadius: "50%",
          }}
        />
        <p
          className="m-0"
          style={{
            fontSize: "1.8rem",
            fontWeight: "900",
            color: "#007236",
            letterSpacing: "1px",
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
          }}
        >
          Finanzas
        </p>
      </div>

      {/* Menú */}
      <div className="sidebar mt-3">
        <nav>
          <ul className="nav nav-pills nav-sidebar flex-column">
            {/* HOME */}
            <li className="nav-item">
              <Link
                to="/homeContabilidad"
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                style={{
                  color: "#000",
                  boxShadow: hovered === "home" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", // Aplica la sombra solo si está hover
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("home")}
                onMouseLeave={handleMouseLeave}
              >
                <i
                  className="nav-icon fas fa-home me-2"
                  style={{ color: "#000" }}
                ></i>
                <p className="m-0">Home</p>
              </Link>
            </li>

            {/* Dashboard Finanzas por Filial */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                onClick={() => setFinanzasOpen(!finanzasOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow: hovered === "finanzas" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", // Aplica la sombra solo si está hover
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("finanzas")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-chart-line me-2"></i>
                <p className="m-0 flex-grow-1">Finanzas por Filial</p>
                <i
                  className={`fas fa-chevron-${finanzasOpen ? "up" : "down"}`}
                ></i>
              </button>
              {finanzasOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  {filialesList.length > 0 ? (
                    filialesList.map((filial) => (
                      <li className="nav-item" key={filial.id}>
                        <Link
                          to={`/dashboard-finanzas-filial-${filial.nombre}`}
                          className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                          style={{
                            color: "#000",
                            boxShadow: hovered === `filial-${filial.id}` ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", 
                            transition: "box-shadow 0.3s",
                          }}
                          onMouseEnter={() => handleMouseEnter(`filial-${filial.id}`)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <i className="nav-icon fas fa-building me-2"></i>
                          <p className="m-0">Filial {filial.nombre}</p>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="ps-4 text-dark">
                      No hay filiales disponibles.
                    </li>
                  )}
                </ul>
              )}
            </li>

            {/* Dashboard General Finanzas */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                onClick={() => setGeneralOpen(!generalOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow: hovered === "general" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", // Aplica la sombra solo si está hover
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("general")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-university me-2"></i>
                <p className="m-0 flex-grow-1">Dashboard General</p>
                <i
                  className={`fas fa-chevron-${generalOpen ? "up" : "down"}`}
                ></i>
              </button>
              {generalOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  <li className="nav-item">
                    <Link
                      to="/dashboard-contabilidad/General-filial"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{
                        color: "#000",
                        boxShadow: hovered === "general-filial" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", // Aplica la sombra solo si está hover
                        transition: "box-shadow 0.3s",
                      }}
                      onMouseEnter={() => handleMouseEnter("general-filial")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <i className="nav-icon fas fa-chart-pie me-2"></i>
                      <p className="m-0">General Filial</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/dashboard-contabilidad/General-cooperativa"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{
                        color: "#000",
                        boxShadow: hovered === "general-cooperativa" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", // Aplica la sombra solo si está hover
                        transition: "box-shadow 0.3s",
                      }}
                      onMouseEnter={() => handleMouseEnter("general-cooperativa")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <i className="nav-icon fas fa-building me-2"></i>
                      <p className="m-0">General Cooperativa</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer p-3 mt-auto text-center">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          style={{ fontWeight: "900", borderRadius: "12px" }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
