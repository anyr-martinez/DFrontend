import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mostrarAlertaPregunta } from "../../SweetAlert/SweetAlert";
import dashboard from "../../../assets/images/dashboard.png";
import { useContextFilial } from "../../Context/filial/FilialContext";

const Aside = () => {
  const [filialesOpen, setFilialesOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [filialesList, setFilialesList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
          Dashboard's
        </p>
      </div>

      {/* Menú */}
      <div className="sidebar mt-3">
        <nav>
          <ul className="nav nav-pills nav-sidebar flex-column">
            {/* Home */}
            <li className="nav-item">
              <Link
                to="/HomeGeneral"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded mb-2`}
                style={{ color: "#000" }}
              >
                <i
                  className="nav-icon fas fa-home me-2"
                  style={{ color: "#000" }}
                ></i>
                <p className="m-0">Home</p>
              </Link>
            </li>
            {/* Filiales */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                onClick={() => setFilialesOpen(!filialesOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                }}
              >
                <i
                  className="nav-icon fas fa-building me-2"
                  style={{ color: "#000" }}
                ></i>
                <p className="m-0 flex-grow-1">Filiales</p>
                <i
                  className={`fas fa-chevron-${filialesOpen ? "up" : "down"}`}
                  style={{ color: "#000" }}
                ></i>
              </button>
              {filialesOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  {filialesList.length > 0 ? (
                    filialesList.map((filial) => (
                      <li className="nav-item" key={filial.id}>
                        <Link
                          to={`/dashboard-filial-${filial.nombre}`}
                          className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                          style={{ color: "#000" }}
                        >
                          <i
                            className="nav-icon fas fa-building me-2"
                            style={{ color: "#000" }}
                          ></i>
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
            {/* Dashboard General */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                onClick={() => setDashboardOpen(!dashboardOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#000",
                }}
              >
                <i
                  className="nav-icon fas fa-chart-pie me-2"
                  style={{ color: "#000" }}
                ></i>
                <p className="m-0 flex-grow-1">Dashboard General</p>
                <i
                  className={`fas fa-chevron-${dashboardOpen ? "up" : "down"}`}
                  style={{ color: "#000" }}
                ></i>
              </button>

              {dashboardOpen && (
                <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                  <li className="nav-item">
                    <Link
                      to="/dashboard-general-filiales"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{ color: "#000" }}
                    >
                      <i
                        className="nav-icon fas fa-building me-2"
                        style={{ color: "#000" }}
                      ></i>
                      <p className="m-0">General Filiales</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/dashboard-general-cooperativa"
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                      style={{ color: "#000" }}
                    >
                      <i
                        className="nav-icon fas fa-university me-2"
                        style={{ color: "#000" }}
                      ></i>
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
