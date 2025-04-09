import React, { useState, useEffect } from "react";
import { useContextUsuario } from "../../Context/user/UserContext";
import { useContextFilial } from "../../Context/filial/FilialContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { usuario } = useContextUsuario();
  const [filial, setFilial] = useState(null); // Usamos un estado local para la filial
  const navigate = useNavigate();
  const [fechaRegistro, setFechaRegistro] = useState(null);
  const [rol, setRol] = useState("");

  useEffect(() => {
    // Recuperamos los datos de filial desde sessionStorage
    const filialNombre = sessionStorage.getItem("filial_nombre");
    const filialId = sessionStorage.getItem("id_filial");

    if (filialNombre && filialId) {
      // Si hay datos en sessionStorage, los asignamos al estado de filial
      setFilial({ nombre: filialNombre, id: filialId });
    } else {
      // Si no hay datos en sessionStorage, puedes manejarlo aquí
      console.log("No se encontró la filial en sessionStorage");
    }

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
  }, [usuario]); // Dependemos solo de usuario, ya que la filial viene del sessionStorage

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("filial_nombre");
    sessionStorage.removeItem("id_filial");
    navigate("/");
  };

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-light shadow-sm" style={{ backgroundColor: "#F0F0E6" }}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars" style={{ color: "#007236" }}></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link" style={{ color: "#007236", fontWeight: "700" }}>
              Inicio
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link d-flex align-items-center" href="#" data-toggle="modal" data-target="#userModal">
              <FontAwesomeIcon icon={faUserTie} style={{ color: "#FF7F32" , fontSize: "30px"}} className="mr-2" />
              <span style={{ color: "#007236", fontWeight: "600", cursor: "pointer" }}>
                {usuario ? `Bienvenido(a), ${usuario.nombre}` : "Invitado"}
                {filial && filial.nombre ? (
                  <strong style={{ display: "block", textTransform: "uppercase" }}>
                    {filial.nombre}
                  </strong>
                ) : (
                  <strong style={{ display: "block" }}> Siguatepeque</strong>
                )}
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
      <div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "12px", backgroundColor: "#F0F0E6", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="modal-header" style={{ backgroundColor: "#007236", color: "#fff", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
              <h5 className="modal-title" id="userModalLabel">Perfil de Usuario</h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <FontAwesomeIcon icon={faUserTie} size="4x" style={{ color: "#FF7F32" }} className="mb-3" />
              <h4 className="font-weight-bold" style={{ color: "#007236" }}>
                {usuario?.nombre}
              </h4>
              <p className="text-muted">@{usuario?.usuario}</p>
              <hr />
              <p>
                <strong>Rol:</strong> {rol || "Cargando..."}
              </p>
              {filial && (
                <p><strong>Filial:</strong> {filial.nombre || "No disponible"}</p>
              )}
              <p>
                <strong>Fecha de Registro:</strong> 
                {fechaRegistro ? fechaRegistro.toLocaleDateString() : "Cargando..."}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" style={{ backgroundColor: "#FF7F32", color: "#fff" }} data-dismiss="modal">
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
