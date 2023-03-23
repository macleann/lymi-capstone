import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RosterContext } from "./RosterProvider";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { AdvancedImage } from "@cloudinary/react";
import { ReleaseContext } from "../releases/ReleaseProvider";
import { ReleaseDetailBand } from "../releases/ReleaseDetailBand";

export const BandDetail = () => {
  const { getBandById } = useContext(RosterContext);
  const { setImageAndSize } = useContext(CldContext);
  const { releases, setReleases, getReleasesByBandId } =
    useContext(ReleaseContext);
  const [band, setBand] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bandId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBandById(bandId).then((res) => setBand(res));
    getReleasesByBandId(bandId)
      .then((res) => setReleases(res))
      .then(() => setIsLoading(false));
  }, [bandId]);

  useEffect(() => {
    getReleasesByBandId(bandId)
      .then(res => setReleases(res))
  }, [releases])

  const bandImage = setImageAndSize(`bandphotos/${band.name}`, 1000);

  // Only renders the parameter if the current user is an artist and is in the band or an admin
  const checkIfArtistInBand = (button) => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    if (lymiUserObject?.isArtist) {
      if (band?.artistBands?.find((aB) => aB.userId === lymiUserObject?.id) || lymiUserObject?.isAdmin) {
        return button;
      }
    }
  };

  // The button to edit the band
  const EditArtistButton = (
    <div className="mt-4 mr-4">
      <button
        className="btn-primary" 
        onClick={(evt) => {
          evt.preventDefault();
          navigate("edit");
        }}
      >
        Edit Artist
      </button>
    </div>
  );

  // The button to add a member
  const AddMembersButton = (
    <div className="mt-4 mr-4">
      <button
        className="btn-primary" 
        onClick={(evt) => {
          evt.preventDefault();
          navigate("members/add");
        }}
      >
        Add Members
      </button>
    </div>
  );

  // The button to add a release
  const AddReleaseButton = (
    <div className="flex justify-end mt-4 mr-4">
      <button
        className="btn-primary" 
        onClick={(evt) => {
          evt.preventDefault();
          navigate("release/add");
        }}
      >
        Add Release
      </button>
    </div>
  );

  // Don't render the component until everything has run
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex justify-end">
        {checkIfArtistInBand(EditArtistButton)}
        {checkIfArtistInBand(AddMembersButton)}
      </div>
      <h2 className="text-3xl text-center mb-6">{band.name}</h2>
      <div className="flex justify-center">
        <div className="w-1/2 justify-end pr-4 pl-8"><AdvancedImage cldImg={bandImage}/></div>
        <div className="w-1/2 justify-start pl-4 pr-8">{band.bio}</div>
      </div>
      <div>
        {checkIfArtistInBand(AddReleaseButton)}
        {releases.map((release) => {
          const releaseImage = setImageAndSize(release?.image?.publicId, 250);
          return (
            <ReleaseDetailBand
              className="flex flex-wrap justify-start my-4"
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
