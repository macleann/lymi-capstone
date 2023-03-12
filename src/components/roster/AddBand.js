import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { RosterContext } from "./RosterProvider";

export const AddBand = () => {
  const { postNewBand } = useContext(RosterContext);
  const [band, setBand] = useState({
    name: "",
    bio: "",
    image: {},
  });
  const navigate = useNavigate();

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    return postNewBand(band).then(() => navigate("/roster"));
  };

  return (
    <>
      <form>
        <h2>Add an Artist: </h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Talking Heads"
              onChange={(evt) => {
                const copy = { ...band };
                copy.name = evt.target.value;
                setBand(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="bio">Bio: </label>
            <textarea
              className="form-control"
              placeholder="We were never really a band, see? We always had this wacky energy -- no one wanted to come near us"
              onChange={(evt) => {
                const copy = { ...band };
                copy.bio = evt.target.value;
                setBand(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="img">Band Photo: </label>
            <UploadWidget
              onUploadSuccess={(imageData) => {
                const copy = { ...band };
                copy.image = imageData;
                setBand(copy);
              }}
            />
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Add Artist
        </button>
      </form>
    </>
  );
};
