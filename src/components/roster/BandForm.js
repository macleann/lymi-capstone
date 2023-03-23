import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { RosterContext } from "./RosterProvider";

export const BandForm = () => {
  const { bandId } = useParams();
  const { postNewBand, putUpdatedBand, getBandById } =
    useContext(RosterContext);
  const [band, setBand] = useState({
    name: "",
    bio: "",
    image: {},
  });
  const [focused, setFocused] = useState({
    name: false,
    bio: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (bandId) {
      getBandById(bandId).then((res) => setBand(res));
    }
  }, []);

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    if (bandId) {
      return putUpdatedBand(band).then(() => navigate("/roster"));
    } else {
      return postNewBand(band).then(() => navigate("/roster"));
    }
  };

  const handleFocus = (field, isFocused) => {
    setFocused({ ...focused, [field]: isFocused });
  };

  const isFocusedOrFilled = (field, value) => {
    return focused[field] || value
      ? "transform -translate-y-[1.15rem] scale-[0.8] text-primary"
      : ""
  }

  return (
    <>
      <form className="w-1/2 mx-auto my-8 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm">
        <h2 className="relative mb-3 text-xl text-center">
          {bandId ? `Edit ${band.name}:` : "Add Artist:"}
        </h2>

        <div className="relative mb-6">
          <input
            type="text"
            id="name"
            className="input-field"
            placeholder="Talking Heads"
            value={band.name}
            onChange={(evt) => {
              const copy = { ...band };
              copy.name = evt.target.value;
              setBand(copy);
            }}
            onFocus={() => handleFocus("name", true)}
            onBlur={(evt) => handleFocus("name", evt.target.value !== "")}
            autoFocus
          />
          <label
            className={`input-label ${isFocusedOrFilled(
              "name",
              band.name
            )} motion-reduce:transition-none`}
          >
            Name
          </label>
        </div>

        <div className="relative mb-6">
          <textarea
            id="bio"
            className="input-field"
            placeholder="We were never really a band, see? We always had this wacky energy -- no one wanted to come near us"
            value={band.bio}
            onChange={(evt) => {
              const copy = { ...band };
              copy.bio = evt.target.value;
              setBand(copy);
            }}
            onFocus={() => handleFocus("bio", true)}
            onBlur={(evt) => handleFocus("bio", evt.target.value !== "")}
          />
          <label
            className={`input-label ${isFocusedOrFilled(
              "bio",
              band.bio
            )} motion-reduce:transition-none`}
          >
            Bio
          </label>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Band Photo: </label>
          <UploadWidget
            id="image"
            className="justify-end"
            onUploadSuccess={(imageData) => {
              const copy = { ...band };
              copy.image = imageData;
              setBand(copy);
            }}
            setAlt={`An image of ${band.name}`}
            setPublicId={`bandphotos/${band.name}`}
            disabled={!band.name}
          />
        </div>

        <div className="justify-center mt-4">
          <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className={`btn-primary ${
              !band.name || !band.image.url ? "btn-primary-disabled" : ""
            }`}
            disabled={!band.name || !band.image.url}
          >
            {bandId ? "Save Changes" : "Add Artist"}
          </button>
        </div>
      </form>
    </>
  );
};
