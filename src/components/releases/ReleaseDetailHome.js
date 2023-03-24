import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ReleaseDetailHome = ({ release }) => {
  const { setImageAndSize } = useContext(CldContext);
  const navigate = useNavigate();

  const albumImage = setImageAndSize(release.image.publicId, 250);

  const handleReleaseClick = () => {
    navigate(`/roster/band/${release.bandId}/release/${release.id}`);
  };

  return (
    <>
      <div
        onClick={handleReleaseClick}
        className="pop-out flex-col mx-2 my-5 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm cursor-pointer"
      >
        <div>
          <AdvancedImage cldImg={albumImage} />
        </div>
        <Link
          to={`/roster/band/${release.bandId}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mt-1 font-semibold hover:underline decoration-wavy">
            {release.band.name}
          </div>
        </Link>
        <div className="mt-1 italic">{release.title}</div>
        <div className="mt-1 text-s">
          {release.releaseType.type}
          {" - "}
          {moment(release.releaseDate).format("MMMM D, YYYY")}
        </div>
      </div>
    </>
  );
};
