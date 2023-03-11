import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { CalendarContext } from "./CalendarProvider";

export const AddShow = () => {
    const { postNewShow } = useContext(CalendarContext)
    const [show, setShow] = useState({
        bandId: "",
        venue: "",
        date: "",
        time: "",
        price: "",
        ticketLink: "",
        image: {}
    })
    const navigate = useNavigate()

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()

        return postNewShow(show)
            .then(() => navigate("/calendar"))
    }

    return (
        <>
            <form>
            <h2>Add Event: </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bandId">Band Id:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={show.bandId}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.bandId = parseInt(evt.target.value)
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="venue">Venue: </label>
                    <input type="text"
                        className="form-control"
                        value={show.venue}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.venue = evt.target.value
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date"
                        className="form-control"
                        value={show.date}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.date = evt.target.value
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time"
                        className="form-control"
                        value={show.time}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.time = evt.target.value
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: </label>
                    <input type="number"
                        className="form-control"
                        value={show.price}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.price = parseFloat(evt.target.value, 2)
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ticketLink">Ticket Link: </label>
                    <input type="url"
                        className="form-control"
                        value={show.ticketLink}
                        onChange={
                            (evt) => {
                                const copy = {...show}
                                copy.ticketLink = evt.target.value
                                setShow(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="img">Poster: </label>
                    <UploadWidget onUploadSuccess={(imageData) => {
                    const copy = { ...show };
                    copy.image = imageData;
                    setShow(copy);
                    }} />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Event
            </button>
        </form>
        </>
    )
};