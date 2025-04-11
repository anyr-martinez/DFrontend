import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mostrarAlertaPregunta } from "../../SweetAlert/SweetAlert";
import dashboard from "../../../assets/images/dashboard.png";
import { useContextFilial } from "../../Context/filial/FilialContext";
import { DesEncriptar } from "../../Encrypt/Crypto";
import { useSessionStorage } from "../../Context/storage/useSessionStorage";

const Aside = () => {
  const [filialesOpen, setFilialesOpen] = useState(false);
  const [filialName, setFilialName] = useState(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  // Acceder al contexto de Filial usando el hook correcto
  const { ObtenerFilial, filial } = useContextFilial(); // Obtener la función y el estado del contexto

  const [user] = useSessionStorage("user", null);

  console.log("ID Filial desde useSessionStorage:", user?.id_filial);

  useEffect(() => {
    try {
      const encryptedUser = sessionStorage.getItem("user");

      if (encryptedUser) {
        // Desencriptamos el valor
        const decryptedUser = DesEncriptar(encryptedUser);

        if (decryptedUser) {
          const idFilial = decryptedUser?.id_filial;
          console.log("ID Filial desde sessionStorage:", idFilial);

          if (idFilial) {
            // Usar la función del contexto para obtener la filial por id
            ObtenerFilial(idFilial); // Llama a la función que obtendrá la filial desde la API
          } else {
            setFilialName("No asignado");
          }
        } else {
          setFilialName("Datos no válidos");
        }
      } else {
        console.log("No se encontró un id_filial en sessionStorage.");
        setFilialName("No asignado");
      }
    } catch (error) {
      console.error(
        "Error al descifrar el usuario desde sessionStorage:",
        error
      );
      setFilialName("Error en datos del usuario");
    }
  }, [ObtenerFilial]); // Dependemos de la función ObtenerFilial

  useEffect(() => {
    // Si 'filial' está disponible, actualizar el nombre de la filial
    if (filial && filial.nombre) {
      setFilialName(filial.nombre);
    }
  }, [filial]); // Depende de la filial obtenida

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFilial");
    e.preventDefault();
    mostrarAlertaPregunta(
      (confirmed) => {
        if (confirmed) {
          navigate("/"); // Redirige al login
        }
      },
      "¿Está seguro que desea Cerrar Sesión?",
      "question"
    );
  };

  const handleMouseEnter = (id) => setHovered(id);
  const handleMouseLeave = () => setHovered(null);

  const isActive = (path) => {
    return location.pathname === path
      ? "active bg-white text-dark shadow-lg rounded"
      : "text-black";
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
          borderRadius: "5 0 10px 10px",
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
                to="/homeFilial"
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                style={{
                  color: "#000",
                  boxShadow:
                    hovered === "home"
                      ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                      : "none",
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

            {/* Filial */}
            <li className="nav-item">
              {/* Botón principal */}
              <button
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow:
                    hovered === "filial"
                      ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                      : "none",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={() => handleMouseEnter("filial")}
                onMouseLeave={handleMouseLeave}
                onClick={() => setFilialesOpen(!filialesOpen)}
              >
                <i
                  className="nav-icon fas fa-building me-2"
                  style={{ color: "#000" }}
                ></i>
                <p className="m-0" style={{ color: "#000" }}>
                  Filial
                </p>
                <i
                  className={`fas fa-chevron-${
                    filialesOpen ? "up" : "down"
                  } ms-2`}
                  style={{ color: "#000" }}
                ></i>
              </button>

              {/* Botón secundario con nombre de la filial */}
              {filialesOpen && (
                <Link
                to={"/dashboard-filial/general-filiales"} 
                className="nav-link d-flex align-items-center py-2 px-3 rounded mb-2 ms-3"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#000",
                  boxShadow:
                    hovered === "filial-nombre"
                      ? "0px 4px 8px rgba(0, 0, 0, 0.3)"
                      : "none",
                  transition: "box-shadow 0.3s",
                  textDecoration: "none"
                }}
                onMouseEnter={() => handleMouseEnter("filial-nombre")}
                onMouseLeave={handleMouseLeave}
              >
                <i className="nav-icon fas fa-map-marker-alt me-2" style={{ color: "#000" }}></i>
                <p className="m-0" style={{ color: "#000" }}>
                  {user?.filial_nombre || "No asignado"}
                </p>
              </Link>
              
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
          style={{
            fontWeight: "900",
            borderRadius: "12px",
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </aside>
  );
};

const MenuItem = ({ path, icon, label, isActive }) => (
  <li className="nav-item">
    <Link
      to={path}
      className={`nav-link d-flex align-items-center py-2 px-3 rounded mb-2 ${isActive(
        path
      )}`}
    >
      <i className={`nav-icon ${icon} me-2`} style={{ color: "#ffffff" }}></i>
      <p className="m-0" style={{ color: "#ffffff" }}>
        {label}
      </p>
    </Link>
  </li>
);

export default Aside;
