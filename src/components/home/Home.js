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
      <h1 className="mt-5 text-3xl text-center">Recent Releases</h1>
      <div className="mt-5 flex flex-wrap">
        {releases.map((release) => (
          <ReleaseDetailHome key={`release--${release.id}`} release={release}/>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <iframe
          src="https://likeyoumeanit.substack.com/embed"
          width="25%"
          height={200}
        ></iframe>
      </div>
    </>
  );
};
