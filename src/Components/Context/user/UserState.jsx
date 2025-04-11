import React, { useState, useEffect } from 'react';
import { UserContext } from '../../Context/user/UserContext';
import { useSessionStorage } from '../../Context/storage/useSessionStorage';
import { AxiosPrivado, AxiosPublico } from "../../Axios/Axios";
import { ListarUsuarios, CrearUsuario, ObtenerById, EliminarUsuario } from "../../Configuration/ApiUrls";

const UserState = (props) => {
  const [usuario, setUser] = useSessionStorage("usuario", null);
  const [token, setToken] = useSessionStorage("token_almacenado", null);
  const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios

  // Efecto para obtener los usuarios solo cuando hay un token válido
  useEffect(() => {
    if (token) {
      obtenerUsuarios();
    }
  }, [token]); // Se ejecuta cada vez que cambia el token

  // Obtener la lista de usuarios
  const obtenerUsuarios = async () => {
    try {
      const respuesta = await AxiosPublico.get(ListarUsuarios, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(respuesta.data.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  //Funcion para obtener por id el usuario
  const obtenerUsuarioPorId = async (id) => {
    try {
      const respuesta = await AxiosPublico.get(`${ObtenerById}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return respuesta.data; // Devolvés el usuario
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      return null;
    }
  };
  
  // Función para cerrar sesión
  const setCerrarSesion = () => {
    setUser(null);
    setToken(null);
    window.sessionStorage.removeItem("usuario");
    window.sessionStorage.removeItem("token_almacenado");
  };

  // Función para iniciar sesión
  const setLogin = async (data) => {
    try {
      setUser(data.usuario);
      setToken(data.token);
    } catch (error) {
      console.error("Error al hacer login:", error);
    }
  };

  // Función para agregar un nuevo usuario
  const agregarUsuario = async (usuarioNuevo) => {
    try {
      const response = await AxiosPrivado.post(CrearUsuario, usuarioNuevo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  
  // Función para eliminar un usuario
  const eliminarUsuario = async (id_usuario) => {
    try {
      await AxiosPrivado.delete(`${EliminarUsuario}/${id_usuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id_usuario !== id_usuario)
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  

  return (
    <UserContext.Provider
      value={{
        usuario,
        token,
        setLogin,
        setCerrarSesion,
        agregarUsuario,
        eliminarUsuario,
        obtenerUsuarios, 
        obtenerUsuarioPorId,
        usuarios, 
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
