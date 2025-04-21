import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useContextUsuario = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); 
  const [token, setToken] = useState(null);

 //Actualizar usuario
  const actualizarUsuario = (nuevoUsuario) => {
    setUsuario(nuevoUsuario);
  };

  // Función para manejar login
  const setLogin = (data) => {
    console.log(data)
    if (data && data.usuario) {
      setUsuario({
        ...data.usuario,
      });
      setToken(data.token); // Guarda el token
    }
  };

  // Función para cerrar sesión
  const setCerrarSesion = () => {
    setUsuario(null); // Restablece el estado del usuario
    setToken(null); // Elimina el token
  };

  return (
    <UserContext.Provider value={{ usuario, token, setLogin, setCerrarSesion, actualizarUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
