import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { CldContext } from "../cloudinary/CloudinaryProvider";

export const ReleaseDetailHome = ({ release }) => {
  const { setImageAndWidth } = useContext(CldContext);

  const albumImage = setImageAndWidth(release.image.publicId, 250);

  return (
    <>
      <div>
        <AdvancedImage cldImg={albumImage} />
      </div>
      <div>{release.name}</div>
      <div>{release.band.name}</div>
      <div>
        <i>{release.title}</i>
      </div>
      <div>{release.releaseDate}</div>
    </>
  );
};
