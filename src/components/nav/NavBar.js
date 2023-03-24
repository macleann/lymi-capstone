import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CldContext } from "../cloudinary/CloudinaryProvider";

export const NavBar = () => {
  const { setImageAndSize } = useContext(CldContext);
  const navigate = useNavigate();
  const localLymiUser = localStorage.getItem("lymi_user");
  const lymiUserObject = JSON.parse(localLymiUser);

  const logo = setImageAndSize("lymi/logo", 60);

  return (
    <ul className="flex items-center">
      <li className="p-3">
        <Link to="/"><AdvancedImage cldImg={logo} className="pop-out" /></Link>
      </li>
      <li className="p-3 font-bold hover:underline decoration-wavy">
        <Link to="/calendar">Calendar</Link>
      </li>
      <li className="p-3 font-bold hover:underline decoration-wavy">
        <Link to="/roster">Roster</Link>
      </li>
      {lymiUserObject?.isAdmin ? (
        <li className="p-3 font-bold hover:underline decoration-wavy">
          <Link to="/users">Users</Link>
        </li>
      ) : (
        ""
      )}
      {localStorage.getItem("lymi_user") ? (
        <li className="ml-auto mr-2 p-3 font-bold hover:underline decoration-wavy">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("lymi_user");
              navigate("/", { replace: true });
              window.alert("You've been logged out.")
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        <li className="ml-auto mr-2 p-3 font-bold hover:underline decoration-wavy">
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  );
};
