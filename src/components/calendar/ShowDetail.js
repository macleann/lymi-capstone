import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { CalendarContext } from "./CalendarProvider";
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { RosterContext } from "../roster/RosterProvider";

export const ShowDetail = () => {
  const { getShowById, deleteShow } = useContext(CalendarContext);
  const { getBandById } = useContext(RosterContext);
  const { setImageAndSize } = useContext(CldContext);
  const { showId } = useParams();
  const [show, setShow] = useState({});
  const [band, setBand] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getShowById(showId).then((res) => setShow(res));
  }, [showId]);

  useEffect(() => {
    if (show.bandId) {
      getBandById(show.bandId)
        .then((res) => setBand(res))
        .then(() => setIsLoading(false));
    }
  }, [show]);

  const showPoster = setImageAndSize(show?.image?.publicId, 500);

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

  // The Edit Show Button
  const editButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        navigate(`/show/${show.id}/edit`);
      }}
    >
      Edit Show
    </button>
  );

  // The Delete Show button
  const deleteButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        deleteShow(show.id);
        navigate("/calendar");
      }}
    >
      Delete Show
    </button>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex flex-col justify-center mt-4">
        <h1 className="pb-4 text-3xl text-center">
          {show?.band?.name} at {show?.venue}
        </h1>
        <div className="flex justify-center">
          <div className="w-1/2 pr-4 pl-8"><AdvancedImage cldImg={showPoster} /></div>
          <div className="w-1/2 flex-col justify-start pl-4 pr-8">
            <div className="text-xl">
              {`${new Date(show?.date).toDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })} at 
              ${new Date(`2020-01-01T${show?.time}`).toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`}
            </div>
            <div>
              {show.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <a href={`//${show?.ticketLink}`}>Get Tickets</a>
            <div className="flex justify-center">
              <div className="btn-primary m-4">{checkIfArtistInBand(editButton)}</div>
              <div className="btn-primary m-4">{checkIfArtistInBand(deleteButton)}</div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};
