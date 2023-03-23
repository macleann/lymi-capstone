import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadWidget } from "../cloudinary/UploadWidget";
import { ReleaseContext } from "./ReleaseProvider";

export const ReleaseForm = () => {
  const { bandId, releaseId } = useParams();
  const {
    postNewRelease,
    putUpdatedRelease,
    getReleaseById,
    releaseTypes,
    setReleaseTypes,
    getReleaseTypes,
  } = useContext(ReleaseContext);
  const [release, setRelease] = useState({
    bandId: parseInt(bandId),
    title: "",
    releaseDate: "1980-10-08",
    releaseTypeId: 1,
    image: {},
  });
  const [focused, setFocused] = useState({
    title: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    getReleaseTypes().then((res) => setReleaseTypes(res));
    if (releaseId) {
      getReleaseById(releaseId).then((res) => setRelease(res));
    }
  }, []);

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    if (releaseId) {
      const { band, releaseType, ...releaseWithoutBand } = release;
      return putUpdatedRelease(releaseWithoutBand).then(() =>
        navigate(`/roster/band/${bandId}`)
      );
    } else {
      return postNewRelease(release).then(() =>
        navigate(`/roster/band/${bandId}`)
      );
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
          {releaseId ? `Edit ${release.title}:` : "Add Release:"}
        </h2>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "title",
              release.title
            )} motion-reduce:transition-none`}>Title: </label>
          <input
            type="text"
            className="input-field"
            placeholder="Remain In Light"
            value={release.title}
            onChange={(evt) => {
              const copy = { ...release };
              copy.title = evt.target.value;
              setRelease(copy);
            }}
            onFocus={() => handleFocus("title", true)}
            onBlur={(evt) => handleFocus("title", evt.target.value !== "")}
            autoFocus
          />
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "releaseDate",
              release.releaseDate
            )} motion-reduce:transition-none`}>Release Date: </label>
          <input
            type="date"
            className="input-field"
            value={release.releaseDate}
            onChange={(evt) => {
              const copy = { ...release };
              copy.releaseDate = evt.target.value;
              setRelease(copy);
            }}
            onFocus={() => handleFocus("releaseDate", true)}
            onBlur={(evt) => handleFocus("releaseDate", evt.target.value !== "")}
          />
        </div>
        <div className="relative mb-6">
          <label className={`input-label ${isFocusedOrFilled(
              "releaseTypeId",
              release.releaseTypeId
            )} motion-reduce:transition-none`}>Release Type:</label>
          <select
            className="input-field"
            value={release.releaseTypeId}
            onChange={(evt) => {
              const copy = { ...release };
              copy.releaseTypeId = parseInt(evt.target.value);
              setRelease(copy);
            }}
          >
            {releaseTypes.map((rT) => {
              return (
                <option key={`releaseType--${rT.id}`} value={rT.id}>
                  {rT.type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative mb-6">
          <label>Cover Art: </label>
          <UploadWidget
            onUploadSuccess={(imageData) => {
              const copy = { ...release };
              copy.image = imageData;
              setRelease(copy);
            }}
            setAlt={`${release.title} art`}
            setPublicId={`${bandId}/release/${release.title}`}
            disabled={!release.title}
          />
        </div>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className={`btn-primary ${
            !release.title || !release.releaseDate || !release.releaseTypeId || !release.image.url ? "btn-primary-disabled" : ""
          }`}
          disabled={!release.title || !release.releaseDate || !release.releaseTypeId || !release.image.url}
        >
          {releaseId ? "Save Changes" : "Add Release"}
        </button>
      </form>
    </>
  );
};
