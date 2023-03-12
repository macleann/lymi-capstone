import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { CalendarContext } from "./CalendarProvider";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { RosterContext } from "../roster/RosterProvider";

export const ShowDetail = () => {
  const { getShowById, deleteShow } = useContext(CalendarContext);
  const { getBandById } = useContext(RosterContext)
  const { setImageAndWidth } = useContext(CldContext);
  const { showId } = useParams();
  const [show, setShow] = useState({});
  const [band, setBand] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getShowById(showId)
        .then(res => setShow(res))
  }, [showId]);

  useEffect(() => {
    if (show.bandId) {
        getBandById(show.bandId)
            .then(res => setBand(res))
            .then(() => setIsLoading(false))
    }
  }, [show])

  const showPoster = setImageAndWidth(show?.image?.publicId, 250);

  // Only renders the parameter if the current user is an artist and is in the band
  const checkIfArtistInBand = (button) => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    if (lymiUserObject?.isArtist) {
      if (band.artistBands.find((aB) => aB.userId === lymiUserObject.id)) {
        return button;
      }
    }
  };

  // The Delete Show button
  const deleteButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        deleteShow(show.id);
        navigate("/calendar")
      }}
    >
      Delete Show
    </button>
  );

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1>
        {show?.band?.name} at {show?.venue}
      </h1>
      <h2>Show's id: {show?.id}</h2>
      <div>
        {show?.date} at {show?.time}
      </div>
      <a href={`https://${show?.ticketLink}`}>Ticket Link</a>
      <div>
        <AdvancedImage cldImg={showPoster} />
      </div>
      {
        checkIfArtistInBand(deleteButton)
      }
    </>
  );
};
