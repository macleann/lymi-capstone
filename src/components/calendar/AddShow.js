import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { RosterContext } from "../roster/RosterProvider";
import { CalendarContext } from "./CalendarProvider";

export const AddShow = () => {
  const { postNewShow } = useContext(CalendarContext);
  const { bands, setBands, getBands } = useContext(RosterContext)
  const [filteredBands, setFilteredBands] = useState([])
  const [show, setShow] = useState({
    bandId: "",
    venue: "",
    date: "",
    time: "",
    price: "",
    ticketLink: "",
    image: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    getBands()
        .then(res => setBands(res))
  }, [])

  useEffect(() => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    const userBands = bands.filter(band => {
        return band.artistBands.find(aB => aB.userId === lymiUserObject.id)
    })

    setFilteredBands(userBands)
  }, [bands])

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    return postNewShow(show).then(() => navigate("/calendar"));
  };

  return (
    <>
      <form>
        <h2>Add Event: </h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="band">Band: </label>
            <select id="band" onChange={(evt) => {
                const copy = {...show}
                copy.bandId = parseInt(evt.target.value)
                setShow(copy)
            }}>
                <option value="0">Choose...</option>
                {
                    filteredBands.map(band => {
                        return <option key={`band--${band.id}`} value={band.id}>{band.name}</option>
                    })
                }
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="venue">Venue: </label>
            <input
              type="text"
              className="form-control"
              value={show.venue}
              onChange={(evt) => {
                const copy = { ...show };
                copy.venue = evt.target.value;
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              className="form-control"
              value={show.date}
              onChange={(evt) => {
                const copy = { ...show };
                copy.date = evt.target.value;
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="time">Time: </label>
            <input
              type="time"
              className="form-control"
              value={show.time}
              onChange={(evt) => {
                const copy = { ...show };
                copy.time = evt.target.value;
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              className="form-control"
              value={show.price}
              onChange={(evt) => {
                const copy = { ...show };
                copy.price = parseFloat(evt.target.value, 2);
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="ticketLink">Ticket Link: </label>
            <input
              type="url"
              className="form-control"
              value={show.ticketLink}
              onChange={(evt) => {
                const copy = { ...show };
                copy.ticketLink = evt.target.value;
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="img">Poster: </label>
            <UploadWidget
              onUploadSuccess={(imageData) => {
                const copy = { ...show };
                copy.image = imageData;
                setShow(copy);
              }}
            />
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Add Event
        </button>
      </form>
    </>
  );
};
