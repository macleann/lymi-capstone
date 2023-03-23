import { AdvancedImage } from "@cloudinary/react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { RosterContext } from "./RosterProvider";

export const Roster = () => {
  const { bands, setBands, getBands } = useContext(RosterContext);
  const { setImageAndSize } = useContext(CldContext);
  const navigate = useNavigate();

  const localLymiUser = localStorage.getItem("lymi_user");
  const currentUser = JSON.parse(localLymiUser);

  useEffect(() => {
    getBands().then((res) => setBands(res));
  }, []);

  const checkIfAdmin = () => {
    if (currentUser?.isAdmin) {
      return (
        <div className="flex justify-end mt-4 mr-4">
          <button className="btn-primary" onClick={() => navigate("/roster/band/add")}>Add Artist</button>
        </div>
      );
    }
  };

  if (bands.length === 0) {
    return null;
  }
  return (
    <>
      {checkIfAdmin()}
      <h1 className="mt-5 text-3xl text-center">Artists</h1>
      <div className="flex flex-wrap justify-evenly">
        {bands.map((band) => {
          const bandImage = setImageAndSize(`bandphotos/${band.name}`, 1000, 1000);

          return (
            <div key={`band--${band.id}`} className="pop-out flex-col w-1/6 mx-2 my-5 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm cursor-pointer">
              <Link to={`band/${band.id}`}>
                <div>
                  <AdvancedImage cldImg={bandImage} />
                </div>
                <div className="pt-4 text-xl text-center">{band.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
