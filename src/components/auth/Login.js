import { AdvancedImage } from "@cloudinary/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { AuthContext } from "./AuthProvider";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState({ email: false, password: false });
  const { getUserForLogin } = useContext(AuthContext);
  const { setImageAndSize } = useContext(CldContext);
  const navigate = useNavigate();

  const logo = setImageAndSize("lymi/logo", 500);

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserForLogin(email, password).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "lymi_user",
          JSON.stringify({
            id: user.id,
            isArtist: user.isArtist,
            isAdmin: user.isAdmin,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  const handleFocus = (field, isFocused) => {
    setFocused({ ...focused, [field]: isFocused });
  };

  const isFocusedOrFilled = (field, value) => {
    return focused[field] || value
      ? "transform -translate-y-[1.15rem] scale-[0.8] text-primary"
      : ""
  }

  return (
    <>
      <main>
        <section className="flex h-screen justify-center items-center">
          <div>
            <AdvancedImage className="px-12" cldImg={logo} />
          </div>
          <form
            className="mx-auto my-8 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm"
            onSubmit={handleLogin}
          >
            <h2 className="relative mb-3">Please sign in</h2>
            <div className="relative mb-6 group">
              <input
                type="text"
                className="input-field"
                placeholder="david@byrne.com"
                onChange={(evt) => setEmail(evt.target.value)}
                onFocus={() => handleFocus("email", true)}
                onBlur={(evt) => handleFocus("email", evt.target.value !== "")}
              />
              <label
                className={`input-label ${isFocusedOrFilled(
                  "email",
                  email
                )} motion-reduce:transition-none`}
              >
                Email address
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                className="input-field"
                onChange={(evt) => setPassword(evt.target.value)}
                onFocus={() => handleFocus("password", true)}
                onBlur={(evt) =>
                  handleFocus("password", evt.target.value !== "")
                }
              />
              <label
                className={`input-label ${isFocusedOrFilled(
                  "password",
                  password
                )} motion-reduce:transition-none`}
              >
                Password
              </label>
            </div>
            <button type="submit" className={`btn-primary ${
              !email || !password ? "btn-primary-disabled" : ""
            }`}
            disabled={!email || !password}>
              Sign in
            </button>
            <section>
              <Link to="/register">Not a user yet?</Link>
            </section>
          </form>
        </section>
      </main>
    </>
  );
};
