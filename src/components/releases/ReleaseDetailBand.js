import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReleaseContext } from "./ReleaseProvider";
import moment from "moment";

export const ReleaseDetailBand = ({ release, releaseImage, checkIfInBand }) => {
  const { deleteRelease } = useContext(ReleaseContext);
  const navigate = useNavigate();

  // The button to edit the release
  const EditReleaseButton = (
    <div className="mt-2">
      <button
        className="btn-primary"
        onClick={(evt) => {
          evt.preventDefault();
          navigate(`/roster/band/${release.bandId}/release/${release.id}/edit`);
        }}
      >
        Edit Release
      </button>
    </div>
  );

  // The Delete Release button
  const deleteButton = (
    <div className="mt-2">
      <button
        className="btn-primary"
        onClick={(evt) => {
          evt.preventDefault();
          deleteRelease(release.id);
          navigate(`/roster/band/${release.bandId}`);
        }}
      >
        Delete Release
      </button>
    </div>
  );

  return (
    <>
      <Link to={`release/${release.id}`}>
        <div
          className="pop-out inline-block m-2 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-md"
          key={`release--${release.id}`}
        >
          <AdvancedImage cldImg={releaseImage} />
          <div className="mt-2 text-center">
            <div>{release.title}</div>
            <div className="italic">
              {release.releaseType.type} -{" "}
              {moment(release.releaseDate).format("MMMM D, YYYY")}
            </div>
            {checkIfInBand(EditReleaseButton)}
            {checkIfInBand(deleteButton)}
          </div>
        </div>
      </Link>
    </>
  );
};
