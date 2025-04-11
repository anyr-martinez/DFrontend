import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import fondogr from "../../assets/images/fondogris.avif";
import {
  mostrarAlerta,
  mostrarAlertaOK,
  mostrarAlertaError,
} from "../SweetAlert/SweetAlert";
import { UsuarioIniciarSesion } from "../Configuration/ApiUrls";
import { AxiosPublico } from "../Axios/Axios";
import { UserContext } from "../Context/user/UserContext";
import { useSessionStorage } from "../Context/storage/useSessionStorage";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLogin } = useContext(UserContext);
  const [, setStoredUser] = useSessionStorage("user", {}); // Correcto, para almacenar los datos del usuario

  // Función para manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!usuario || !contrasena) {
        mostrarAlerta("Por favor, complete todos los campos.", "warning");
        return;
    }

    try {
        const response = await AxiosPublico.post(UsuarioIniciarSesion, {
            usuario: usuario,
            contrasena: contrasena,
        });

        if (response?.data.data && response.data.data.token) {
          const { token, usuario, nombre, id, rol_id, rol_nombre, id_filial, filial_nombre } = response.data.data;
      
          // Verificar los valores de los campos antes de guardarlos
          console.log('Datos antes de guardar:', { token, usuario, rol_nombre, filial_nombre, id_filial });
      
          // Si los valores están indefinidos, se asignan valores por defecto
          const rolNombre = rol_nombre || 'Rol no asignado';
          const filialNombre = filial_nombre || 'Filial no asignada';
      
          // Guardar en el contexto
          setLogin({
              usuario: {
                  usuario: usuario,
                  nombre: nombre,
                  id: id,
                  rol_id: rol_id,
                  rol_nombre: rolNombre,
                  id_filial: id_filial,
                  filial_nombre: filialNombre,
              },
              token: token,
          });
      
          // Guardar en sessionStorage
          setStoredUser({
              usuario: usuario,
              token: response.data.data.token,
              id_filial: id_filial,
              rol_nombre: rolNombre,
              filial_nombre: filialNombre,
              nombre: nombre,  
          });
      
          console.log('Datos guardados en sessionStorage:', {
              usuario: usuario,
              token: response.data.data.token,
              id_filial: id_filial,
              rol_nombre: rolNombre,
              filial_nombre: filialNombre,
              nombre: nombre, 
          });
      
          // Redirigir según el rol_id del usuario
          if (rol_id === 1) {
              navigate("/HomeFilial"); // Página de Gerente Filial
          } else if (rol_id === 3) {
              navigate("/HomeGeneral"); // Página de Gerente General
          } else if (rol_id === 4) {
              navigate("/HomeContabilidad"); // Página de Gerente Contabilidad
          }
      
          mostrarAlertaOK("Inicio de sesión exitoso", "success");
      
      
        } else {
            mostrarAlertaError("Error en el inicio de sesión. Inténtelo de nuevo.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        mostrarAlertaError("Usuario o contraseña incorrectos.");
    }
  };

  // Función para manejar el cambio en los campos de entrada
  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "usuario") {
      setUsuario(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  return (
    <section
      className="vh-100"
      style={{
        backgroundImage: `url(${fondogr})`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      
    >
      <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
        <div className="col col-xl-5"> {/* Aumentamos el tamaño de la columna */}
          <div
            className="card"
            style={{
              borderRadius: "2rem",
              backgroundColor: "#F0F0E6",
              padding: "40px", 
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              width: "100%", 
        
            }}
          >
            <div className="card-body text-black text-center">
              {/* Logo */}
              <div className="mb-4" style={{ marginLeft: "-8px", marginRight: "15px" }}>
                <img src={logo} alt="Logo" style={{ width: "350px" }} />
              </div>
  
              <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                <span className="h2 fw-bold mb-0">Iniciar Sesión</span>
              </div>
  
              <form onSubmit={handleSubmit}>
                {/* Campo de Usuario */}
                <div className="form-outline mb-4 position-relative">
                  <input
                    type="text"
                    id="usuario"
                    className="form-control form-control-lg pe-4"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={handleChange}
                  />
                  <i
                    className="fas fa-user position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      color: "#007236",
                    }}
                  ></i>
                </div>
  
                {/* Campo de Contraseña */}
                <div className="form-outline mb-4 position-relative">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg pe-4"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={handleChange}
                  />
                  <i
                    className="fas fa-lock position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      color: "#007236",
                    }}
                  ></i>
                </div>
  
                {/* Botón de Iniciar sesión */}
                <div className="pt-1 mb-4 d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{
                      fontSize: "16px",
                      padding: "10px 50px",
                      width: "auto",
                    }}
                  >
                    INGRESAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default Login;
