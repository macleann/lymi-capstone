import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(`http://localhost:8088/users?_embed=artistBands`).then(
      (response) => response.json()
    );
  };

  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then((response) =>
      response.json()
    );
  };

  const getUserForLogin = (email, password) => {
    return fetch(
      `http://localhost:8088/users?email=${email}&password=${password}`
    ).then((response) => response.json());
  };

  const postNewUser = (user) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
  };

  const putUpdatedUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        getUsers,
        getUserById,
        getUserForLogin,
        postNewUser,
        putUpdatedUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
