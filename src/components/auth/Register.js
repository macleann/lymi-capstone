import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });
  const { postNewUser, getUserByEmail } = useContext(AuthContext);
  let navigate = useNavigate();

  const registerNewUser = () => {
    return postNewUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "lymi_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateNewUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  const handleFocus = (field, isFocused) => {
    setFocused({ ...focused, [field]: isFocused });
  };

  const isFocusedOrFilled = (field, value) => {
    return focused[field] || value
      ? "transform -translate-y-[1.15rem] scale-[0.8] text-primary"
      : "";
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form
        className="w-1/2 mx-auto my-8 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm"
        onSubmit={handleRegister}
      >
        <h2 className="relative mb-3 text-xl">
          Register for Like You Mean It Records
        </h2>

        <div className="relative mb-6 group">
          <input
            type="text"
            id="name"
            className="input-field"
            placeholder="David Byrne"
            onChange={updateNewUser}
            onFocus={() => handleFocus("name", true)}
            onBlur={(evt) => handleFocus("name", evt.target.value !== "")}
            required
            autoFocus
          />
          <label
            className={`input-label ${isFocusedOrFilled(
              "name",
              user.name
            )} motion-reduce:transition-none`}
          >
            Full Name
          </label>
        </div>

        <div className="relative mb-6 group">
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="david@byrne.com"
            onChange={updateNewUser}
            onFocus={() => handleFocus("email", true)}
            onBlur={(evt) => handleFocus("email", evt.target.value !== "")}
            required
          />
          <label
            className={`input-label ${isFocusedOrFilled(
              "email",
              user.email
            )} motion-reduce:transition-none`}
          >
            Email address
          </label>
        </div>

        <div className="relative mb-6 group">
          <input
            type="password"
            id="password"
            className="input-field"
            onChange={updateNewUser}
            onFocus={() => handleFocus("password", true)}
            onBlur={(evt) => handleFocus("password", evt.target.value !== "")}
            required
          />
          <label
            className={`input-label ${isFocusedOrFilled(
              "password",
              user.password
            )} motion-reduce:transition-none`}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className={`btn-primary ${
            !user.email || !user.name || !user.password ? "btn-primary-disabled" : ""
          }`}
          disabled={!user.email || !user.name || !user.password}
        >
          Register
        </button>
      </form>
    </main>
  );
};
