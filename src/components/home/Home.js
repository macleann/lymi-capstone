import { useContext, useEffect } from "react";
import { ReleaseDetailHome } from "../releases/ReleaseDetailHome";
import { ReleaseContext } from "../releases/ReleaseProvider";

export const Home = () => {
  const { releases, setReleases, getRecentReleases } =
    useContext(ReleaseContext);

  useEffect(() => {
    getRecentReleases().then((res) => setReleases(res));
  }, []);

  return (
    <>
      <h1>Recent Releases</h1>
      {releases.map((release) => (
        <ReleaseDetailHome key={`release--${release.id}`} release={release} />
      ))}
      <iframe
        src="https://likeyoumeanit.substack.com/embed"
        width="50%"
        height={320}
        style={{ border: "1px solid #EEE", background: "white" }}
      ></iframe>
    </>
  );
};
