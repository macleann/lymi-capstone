import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { ReleaseContext } from "./ReleaseProvider";

export const ReleaseDetailBand = ({ release, releaseImage, checkIfInBand }) => {
  const { deleteRelease } = useContext(ReleaseContext);
  
  // The Delete Release button
  const deleteButton = (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        deleteRelease(release.id);
      }}
    >
      Delete Release
    </button>
  );

  return (
    <>
      <div key={`release--${release.id}`}>
        <AdvancedImage cldImg={releaseImage} />
        <div>{release.title}</div>
        <i>{release.releaseDate}</i>
      </div>
      {checkIfInBand(deleteButton)}
    </>
  );
};
