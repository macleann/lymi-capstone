import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RosterContext } from "./RosterProvider";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { AdvancedImage } from "@cloudinary/react";
import { ReleaseContext } from "../releases/ReleaseProvider";
import { ReleaseDetailBand } from "../releases/ReleaseDetailBand";

export const BandDetail = () => {
  const { getBandById } = useContext(RosterContext);
  const { setImageAndWidth } = useContext(CldContext);
  const { releases, setReleases, getReleasesByBandId } =
    useContext(ReleaseContext);
  const [band, setBand] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBandById(id).then((res) => setBand(res));
    getReleasesByBandId(id)
      .then((res) => setReleases(res))
      .then(() => setIsLoading(false));
  }, [id, releases]);

  const bandImage = setImageAndWidth(band?.image?.publicId, 500);

  // Only renders the parameter if the current user is an artist and is in the band
  const checkIfArtistInBand = (button) => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    if (lymiUserObject?.isArtist) {
      if (band.artistBands.find((aB) => aB.userId === lymiUserObject.id) || lymiUserObject?.isAdmin) {
        return button;
      }
    }
  };

  // The button to add a member
  const AddMembersButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        navigate("members/add");
      }}
    >
      Add Members
    </button>
  );

  // The button to add a release
  const AddReleaseButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        navigate("release/add");
      }}
    >
      Add Release
    </button>
  );

  // Don't render the component until everything has run
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h2>{band.name}</h2>
      {checkIfArtistInBand(AddMembersButton)}
      <div>
        <AdvancedImage cldImg={bandImage} />
      </div>
      <div>{band.bio}</div>
      <div>
        {checkIfArtistInBand(AddReleaseButton)}
        {releases.map((release) => {
          const releaseImage = setImageAndWidth(release?.image?.publicId, 250);
          return (
            <ReleaseDetailBand
              key={`release--${release.id}`}
              release={release}
              releaseImage={releaseImage}
              checkIfInBand={checkIfArtistInBand}
            />
          );
        })}
      </div>
    </>
  );
};
