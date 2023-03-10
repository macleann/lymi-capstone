import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
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

        navigate("/home");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return getUserByEmail(user.email)
      .then((response) => {
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

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for Like You Mean It Records
        </h1>
        <fieldset>
          <label htmlFor="name"> Full Name </label>
          <input
            onChange={updateNewUser}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateNewUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            onChange={updateNewUser}
            type="password"
            id="password"
            placeholder="Password"
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
