import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { RosterContext } from "../roster/RosterProvider";
import { CalendarContext } from "./CalendarProvider";

export const ShowForm = () => {
  const { getShowById, postNewShow, putUpdatedShow } =
    useContext(CalendarContext);
  const { bands, setBands, getBands } = useContext(RosterContext);
  const [filteredBands, setFilteredBands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState({
    bandId: "",
    venue: "",
    date: "2023-01-01",
    time: "19:30",
    price: "",
    ticketLink: "",
    image: {},
  });
  const [focused, setFocused] = useState({
    bandId: true,
    venue: false,
    date: true,
    time: true,
    price: false,
    ticketLink: false,
  });
  const { showId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBands()
      .then((res) => setBands(res))
      .then(() => {
        if (showId) {
          getShowById(showId)
            .then((res) => setShow(res))
            .then(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    const userBands = bands.filter((band) => {
      return band.artistBands.find((aB) => aB.userId === lymiUserObject.id);
    });

    setFilteredBands(userBands);
  }, [bands]);

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    if (showId) {
      const { band, ...showWithoutBand } = show;
      return putUpdatedShow(showWithoutBand).then(() =>
        navigate(`/show/${showId}`)
      );
    } else {
      return postNewShow(show).then(() => navigate("/calendar"));
    }
  };

  const handleFocus = (field, isFocused) => {
    setFocused({ ...focused, [field]: isFocused });
  };

  const isFocusedOrFilled = (field, value) => {
    return focused[field] || value
      ? "transform -translate-y-[1.15rem] scale-[0.8] text-primary"
      : "";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <form className="w-1/2 mx-auto my-8 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm">
        <h2 className="relative mb-3 text-xl text-center">
          {showId ? `Edit ${show.band.name} at ${show.venue}:` : "Add Event"}
        </h2>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "bandId",
              show.bandId
            )} motion-reduce:transition-none`}>Band: </label>
          <select
            value={show.bandId}
            className="input-field"
            onChange={(evt) => {
              const copy = { ...show };
              copy.bandId = parseInt(evt.target.value);
              setShow(copy);
            }}
            onFocus={() => handleFocus("bandId", true)}
            onBlur={(evt) => handleFocus("bandId", evt.target.value !== "")}
          >
            <option value="0">Choose...</option>
            {filteredBands.map((band) => {
              return (
                <option key={`band--${band.id}`} value={band.id}>
                  {band.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "venue",
              show.venue
            )} motion-reduce:transition-none`}>Venue: </label>
          <input
            required
            type="text"
            className="input-field"
            value={show.venue}
            placeholder="The Ryman"
            onChange={(evt) => {
              const copy = { ...show };
              copy.venue = evt.target.value;
              setShow(copy);
            }}
            onFocus={() => handleFocus("venue", true)}
            onBlur={(evt) => handleFocus("venue", evt.target.value !== "")}
          />
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "date",
              show.date
            )} motion-reduce:transition-none`}>Date: </label>
          <input
            required
            type="date"
            className="input-field"
            value={show.date}
            onChange={(evt) => {
              const copy = { ...show };
              copy.date = evt.target.value;
              setShow(copy);
            }}
            onFocus={() => handleFocus("date", true)}
            onBlur={(evt) => handleFocus("date", evt.target.value !== "")}
          />
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "time",
              show.time
            )} motion-reduce:transition-none`}>Time: </label>
          <input
            required
            type="time"
            className="input-field"
            value={show.time}
            onChange={(evt) => {
              const copy = { ...show };
              copy.time = evt.target.value;
              setShow(copy);
            }}
            onFocus={() => handleFocus("time", true)}
            onBlur={(evt) => handleFocus("time", evt.target.value !== "")}
          />
        </div>
        {/* CONSIDER ADDING A FREE? CHECKBOX FOR PRICE HERE */}
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "price",
              show.price
            )} motion-reduce:transition-none`}>Price:</label>
          <input
            required
            type="number"
            className="input-field"
            value={show.price}
            placeholder="$10"
            onChange={(evt) => {
              const copy = { ...show };
              copy.price = parseFloat(evt.target.value, 2);
              setShow(copy);
            }}
            onFocus={() => handleFocus("price", true)}
            onBlur={(evt) => handleFocus("price", evt.target.value !== "")}
          />
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "ticketLink",
              show.ticketLink
            )} motion-reduce:transition-none`}>Ticket Link: </label>
          <input
            type="url"
            className="input-field"
            value={show.ticketLink}
            placeholder="ticketmasterblows.com"
            onChange={(evt) => {
              const copy = { ...show };
              copy.ticketLink = evt.target.value;
              setShow(copy);
            }}
            onFocus={() => handleFocus("ticketLink", true)}
            onBlur={(evt) => handleFocus("ticketLink", evt.target.value !== "")}
          />
        </div>
        <div className="relative mb-6">
          <label>Poster: </label>
          <UploadWidget
            onUploadSuccess={(imageData) => {
              const copy = { ...show };
              copy.image = imageData;
              setShow(copy);
            }}
            setAlt={`The poster for the show on ${show.date} at ${show.venue}`}
            setPublicId={`${show.bandId}/shows/${show.venue}/${show.date}`}
            disabled={!show.bandId || !show.venue || !show.date}
          />
        </div>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className={`btn-primary ${
            !show.bandId || !show.venue || !show.date || !show.time || !show.price || !show.ticketLink || !show.image.url ? "btn-primary-disabled" : ""
          }`}
          disabled={!show.bandId || !show.venue || !show.date || !show.time || !show.price || !show.ticketLink || !show.image.url}
        >
          {showId ? "Save Changes" : "Add Event"}
        </button>
      </form>
    </>
  );
};
