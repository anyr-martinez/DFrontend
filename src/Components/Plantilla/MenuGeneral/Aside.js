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
  const [hovered, setHovered] = useState(null);
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

  const handleMouseEnter = (id) => setHovered(id);
  const handleMouseLeave = () => setHovered(null);

  const menuItems = [
    {
      id: "home",
      to: "/HomeGeneral",
      iconClass: "fas fa-home",
      label: "Home",
    },
    {
      id: "filiales",
      label: "Filiales",
      iconClass: "fas fa-building",
      isSubmenu: true,
      submenu: filialesList.length > 0 ? filialesList.map((filial) => ({
        to: `/dashboard-filial-${filial.nombre}`,
        label: `Filial ${filial.nombre}`,
        iconClass: "fas fa-building",
        id: `filial-${filial.id}`,
      })) : [{ label: "No hay filiales disponibles." }],
    },
    {
      id: "general",
      label: "Dashboard General",
      iconClass: "fas fa-chart-pie",
      isSubmenu: true,
      submenu: [
        {
          to: "/dashboard-general/general-filial",
          label: "General Filiales",
          iconClass: "fas fa-building",
          id: "general-filial",
        },
        {
          to: "/dashboard-general/general-cooperativa",
          label: "General Cooperativa",
          iconClass: "fas fa-university",
          id: "general-cooperativa",
        },
      ],
    },
  ];

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column" style={{ backgroundColor: "#E0E0D6" }}>
      <div className="brand-link d-flex flex-column align-items-center justify-content-center p-3" style={{
        backgroundColor: "#F0F0E6",
        color: "#212529",
        fontWeight: "bold",
        textAlign: "center",
        borderBottom: "6px solid #007236",
      }}>
        <img src={dashboard} className="img-circle elevation-3" alt="Logo" style={{
          width: "100px",
          height: "100px",
          marginBottom: "10px",
          border: "3px solid #007236",
          padding: "1px",
          backgroundColor: "#F0F0E6",
          borderRadius: "50%",
        }} />
        <p className="m-0" style={{
          fontSize: "1.8rem",
          fontWeight: "900",
          color: "#007236",
          letterSpacing: "1px",
          fontFamily: "'Segoe UI', 'Roboto', sans-serif",
        }}>
          Dashboard's
        </p>
      </div>

      <div className="sidebar mt-3">
        <nav>
          <ul className="nav nav-pills nav-sidebar flex-column">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.id}>
                {!item.isSubmenu ? (
                  <Link
                    to={item.to}
                    className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                    style={{
                      color: "#000",
                      boxShadow: hovered === item.id ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                      transition: "box-shadow 0.3s",
                    }}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <i className={`nav-icon ${item.iconClass} me-2`} style={{ color: "#000" }}></i>
                    <p className="m-0">{item.label}</p>
                  </Link>
                ) : (
                  <>
                    <button
                      className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 w-100 text-start"
                      onClick={() => item.id === "filiales" ? setFilialesOpen(!filialesOpen) : setDashboardOpen(!dashboardOpen)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#000",
                        boxShadow: hovered === item.id ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                        transition: "box-shadow 0.3s",
                      }}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <i className={`nav-icon ${item.iconClass} me-2`} style={{ color: "#000" }}></i>
                      <p className="m-0 flex-grow-1">{item.label}</p>
                      <i className={`fas fa-chevron-${item.id === "filiales" ? (filialesOpen ? "up" : "down") : (dashboardOpen ? "up" : "down")}`} style={{ color: "#000" }}></i>
                    </button>
                    {(filialesOpen && item.id === "filiales" || dashboardOpen && item.id === "general") && (
                      <ul className="nav nav-pills nav-sidebar flex-column ps-4">
                        {item.submenu.map((subitem) => (
                          <li className="nav-item" key={subitem.id}>
                            <Link
                              to={subitem.to}
                              className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                              style={{
                                color: "#000",
                                boxShadow: hovered === subitem.id ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                                transition: "box-shadow 0.3s",
                              }}
                              onMouseEnter={() => handleMouseEnter(subitem.id)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <i className={`nav-icon ${subitem.iconClass} me-2`} style={{ color: "#000" }}></i>
                              <p className="m-0">{subitem.label}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

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
