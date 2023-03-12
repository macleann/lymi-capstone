import { ArtistViews } from "./ArtistViews";
import { FanViews } from "./FanViews";

export const ApplicationViews = () => {
  const localLymiUser = localStorage.getItem("lymi_user");
  const lymiUserObject = JSON.parse(localLymiUser);

  if (lymiUserObject?.isArtist) {
    return <ArtistViews currentUser={lymiUserObject} />;
  }
  return <FanViews />;
};
