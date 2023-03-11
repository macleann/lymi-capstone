import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UploadWidget } from "../cloudinary/UploadWidget"
import { ReleaseContext } from "./ReleaseProvider"

export const AddRelease = () => {
    const { bandId } = useParams()
    const { postNewRelease } = useContext(ReleaseContext)
    const [release, setRelease] = useState({
        bandId: parseInt(bandId),
        title: "",
        releaseDate: "",
        image: {}
    })
    const navigate = useNavigate()

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()

        return postNewRelease(release)
            .then(() => navigate(`/roster/band/${bandId}`))
    }

    return (
        <>
            <form>
            <h2>Add Release: </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text"
                        className="form-control"
                        value={release.title}
                        onChange={
                            (evt) => {
                                const copy = {...release}
                                copy.title = evt.target.value
                                setRelease(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="releaseDate">Release Date: </label>
                    <input type="date"
                        className="form-control"
                        value={release.releaseDate}
                        onChange={
                            (evt) => {
                                const copy = {...release}
                                copy.releaseDate = evt.target.value
                                setRelease(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="img">Poster: </label>
                    <UploadWidget onUploadSuccess={(imageData) => {
                    const copy = { ...release };
                    copy.image = imageData;
                    setRelease(copy);
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
}