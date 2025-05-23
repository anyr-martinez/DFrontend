import React, { useState, useEffect } from "react";
import { useContextUsuario } from "../../Context/user/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { usuario } = useContextUsuario();
  const navigate = useNavigate();
  const [fechaRegistro, setFechaRegistro] = useState(null);
  const [rol, setRol] = useState("");

  useEffect(() => {
    // Fecha de registro: Usamos la fecha actual
    const now = new Date();
    setFechaRegistro(now);

    // Asignamos el rol basado en el rol_id del usuario
    if (usuario) {
      switch (usuario.rol_id) {
        case 1:
          setRol("Gerente Filial");
          break;
        case 3:
          setRol("Gerente General");
          break;
        case 4:
          setRol("Contador");
          break;
        default:
          setRol("Rol desconocido");
      }
    }
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav
        className="main-header navbar navbar-expand navbar-light shadow-sm"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" style={{ color: "#009846" }}></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a
              href="/"
              className="nav-link"
              style={{ color: "#009846", fontWeight: "700" }}
            >
              Inicio
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link d-flex align-items-center"
              href="#"
              data-toggle="modal"
              data-target="#userModal"
            >
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: "#FF7F32", fontSize: "30px" }}
                className="mr-2"
              />
              <span
                style={{
                  color: "#009846",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {usuario ? `Bienvenido(a), ${usuario.nombre}` : "Invitado"}
              </span>
            </a>
          </li>

          {usuario && usuario.login && (
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleLogout}>
                Cerrar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Modal de Usuario */}
      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            style={{
              borderRadius: "12px",
              backgroundColor: "#F0F0E6",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="modal-header"
              style={{
                backgroundColor: "#009846",
                color: "#fff",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            >
               <h5 className="modal-title" id="userModalLabel">
                Perfil de Usuario
              </h5>
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img
                src={
                  usuario?.foto
                    ? require(`../../../../public/imagenes/${usuario.foto}`)
                    : "Foto"
                }
                alt="Foto de usuario"
                className="rounded-circle mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "3px solid #FC4B08",
                }}
              />
              <h4 className="font-weight-bold" style={{ color: "#009846" }}>
                {usuario?.nombre}
              </h4>
              <p className="text-muted">@{usuario?.usuario}</p>
              <hr />
              <p>
                <strong>Rol:</strong> {rol || "Cargando..."}
              </p>
              <p>
                <strong>Fecha de Registro:</strong>
                {fechaRegistro
                  ? fechaRegistro.toLocaleDateString()
                  : "Cargando..."}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#fc4608", color: "#fff" }}
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
