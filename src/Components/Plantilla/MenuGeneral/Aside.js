import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mostrarAlertaPregunta } from "../../SweetAlert/SweetAlert";
import dashboard from "../../../assets/images/dashboard.png";
import { useContextFilial } from "../../Context/filial/FilialContext";
import { ListarFiliales } from "../../Configuration/ApiUrls";
import { AxiosPublico } from "../../Axios/Axios";

const Aside = () => {
  const [filialesOpen, setFilialesOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [filialesList, setFilialesList] = useState([]);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { ObtenerFiliales } = useContextFilial();

  useEffect(() => {
    const fetchFiliales = async () => {
      try {
        const response = await AxiosPublico.get(ListarFiliales);
        setFilialesList(response.data);
      } catch (error) {
        console.error("Error al obtener filiales:", error);
      }
    };

    fetchFiliales();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userFilial");
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
      style={{
        backgroundColor: "#dcdcdc",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div
        className="brand-link d-flex flex-column align-items-center justify-content-center p-3"
        style={{
          backgroundColor: "#f6f6f6",
          color: "#212529",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "6px solid #009846",
        }}
      >
        <img
          src={dashboard}
          alt="Logo"
          className="img-circle elevation-3"
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "10px",
            border: "3px solid #009846",
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
            color: "#009846",
            letterSpacing: "1px",
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
          }}
        >
          Dashboard's
        </p>
      </div>

      {/* Menú */}
      <div className="sidebar mt-3 px-2">
        <nav>
          <ul className="nav nav-pills nav-sidebar flex-column">
            {/* Home */}
            <li className="nav-item">
              <Link
                to="/homeGeneral"
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                style={{
                  color: "#000",
                  boxShadow: hovered === "home" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("home")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-home me-2"></i>
                <p className="m-0">Home</p>
              </Link>
            </li>

            {/* Filiales */}
            <li className="nav-item">
              <button
                onClick={() => setFilialesOpen(!filialesOpen)}
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow: hovered === "filiales" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("filiales")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-building me-2"></i>
                <p className="m-0 flex-grow-1">Filiales</p>
                <i className={`fas fa-chevron-${filialesOpen ? "up" : "down"}`}></i>
              </button>
              {filialesOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  {filialesList.length > 0 ? (
                    filialesList.map((filial) => (
                      <li className="nav-item" key={filial.id}>
                        <Link
                          to={`/dashboard-general/por-filial`}
                          className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                          style={{
                            color: "#000",
                            boxShadow:
                              hovered === `filial-${filial.id}`
                                ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                                : "none",
                            transition: "box-shadow 0.3s",
                          }}
                          onMouseEnter={() => handleMouseEnter(`filial-${filial.id}`)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <i className="nav-icon fas fa-chart-line me-2"></i>
                          <p className="m-0">Filial {filial.nombre}</p>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="ps-4 text-dark">No hay filiales disponibles.</li>
                  )}
                </ul>
              )}
            </li>

            {/* Dashboard General */}
            <li className="nav-item">
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow: hovered === "dashboard" ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("dashboard")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-university me-2"></i>
                <p className="m-0 flex-grow-1">Dashboard General</p>
                <i className={`fas fa-chevron-${dashboardOpen ? "up" : "down"}`}></i>
              </button>
              {dashboardOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  <li className="nav-item">
                    <Link
                      to="/dashboard-general/general-filial"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{
                        color: "#000",
                        boxShadow:
                          hovered === "general-filial"
                            ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                            : "none",
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
                      to="/dashboard-general/general-cooperativa"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{
                        color: "#000",
                        boxShadow:
                          hovered === "general-cooperativa"
                            ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                            : "none",
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

      {/* Footer Logout */}
      <div className="sidebar-footer p-3 text-center mt-auto">
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
