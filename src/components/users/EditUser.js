import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export const EditUser = () => {
  const { getUserById, putUpdatedUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then((res) => setUser(res));
  }, [userId]);

  const handleUpdate = (evt) => {
    evt.preventDefault();
    return putUpdatedUser(user).then(() => navigate("/users"));
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleUpdate}>
        <h1 className="h3 mb-3 font-weight-normal">User Update</h1>
        <fieldset>
          <label htmlFor="name"> Full Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="form-control"
            placeholder={user.name}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="isArtist"> Artist? </label>
          <input
            onChange={updateUser}
            type="checkbox"
            id="isArtist"
            checked={user.isArtist}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="isAdmin"> Admin? </label>
          <input
            onChange={updateUser}
            type="checkbox"
            id="isAdmin"
            checked={user.isAdmin}
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Update User </button>
        </fieldset>
      </form>
    </main>
  );
};
