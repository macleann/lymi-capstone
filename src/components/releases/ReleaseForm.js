import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImageWidget } from "../cloudinary/UploadImageWidget";
import { ReleaseContext } from "./ReleaseProvider";
import { SongModal } from "../songs/SongModal";
import { SongContext } from "../songs/SongProvider";
import { DnDSongOrder } from "../songs/DnDSongOrder";
import Multiselect from "multiselect-react-dropdown";

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
  const {
    songs,
    setSongs,
    releaseSongs,
    setReleaseSongs,
    getReleaseSongsByRelease,
    getReleaseSongsByBand,
    postNewReleaseSong,
    putUpdatedReleaseSong,
  } = useContext(SongContext);
  const [release, setRelease] = useState({
    bandId: parseInt(bandId),
    title: "",
    releaseDate: "1980-10-08",
    releaseTypeId: 1,
    image: {},
  });
  const [allSongsByBand, setAllSongsByBand] = useState([])
  const [focused, setFocused] = useState({
    title: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getReleaseTypes()
      .then((res) => setReleaseTypes(res))
      .then(() => {
        if (releaseId) {
          getReleaseById(releaseId).then((res) => setRelease(res));
          getReleaseSongsByRelease(releaseId).then((res) => {
            setReleaseSongs(res);
            const songsWithTrackNumber = res
              .map((rS) => ({ ...rS.song, trackNumber: rS.trackNumber }))
              .sort((a, b) => a.trackNumber - b.trackNumber);
            setSongs(songsWithTrackNumber);
          });
        }
      })
      .then(() => {
        getReleaseSongsByBand(bandId)
          .then((res) => {
            const songsWithTrackNumber = res
              .map((rS) => ({ ...rS.song, trackNumber: rS.trackNumber }))
              .sort((a, b) => a.trackNumber - b.trackNumber);
            setAllSongsByBand(songsWithTrackNumber)
          })
      })
      .then(() => setIsLoading(false));
  }, []);

  const handleSongAdded = (createdSong) => {
    return setSongs([...songs, createdSong]);
  };

  const handleReleaseSongs = (releaseId) => {
    songs.forEach((song, index) => {
      const releaseSongData = {
        bandId: parseInt(bandId),
        releaseId: parseInt(releaseId),
        songId: song.id,
        trackNumber: index + 1,
      };

      const existingReleaseSong = releaseSongs.find(
        (rS) => rS.songId === song.id
      );

      if (existingReleaseSong) {
        const { song, release, ...onlyReleaseSong } = existingReleaseSong;
        putUpdatedReleaseSong({ ...onlyReleaseSong, ...releaseSongData });
      } else {
        postNewReleaseSong(releaseSongData);
      }
    });
  };

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    if (releaseId) {
      const { band, releaseType, ...justTheRelease } = release;
      return putUpdatedRelease(justTheRelease).then(() => {
        handleReleaseSongs(releaseId);
        navigate(`/roster/band/${bandId}`);
      });
    } else {
      return postNewRelease(release).then((newRelease) => {
        handleReleaseSongs(newRelease.id);
        navigate(`/roster/band/${bandId}`);
      });
    }
  };

  const handleFocus = (field, isFocused) => {
    setFocused({ ...focused, [field]: isFocused });
  };

  const isFocusedOrFilled = (field, value) => {
    return focused[field] || value
      ? "transform -translate-y-[1.15rem] scale-[0.8] text-primary"
      : "";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <form
        className="w-1/2 mx-auto my-8 border-2 border-none rounded-lg shadow-md p-4 backdrop-blur-sm"
        onSubmit={handleSaveButtonClick}
      >
        <h2 className="relative mb-3 text-xl text-center">
          {releaseId ? `Edit ${release.title}:` : "Add Release:"}
        </h2>
        <div className="relative mb-6">
          <label
            className={`input-label ${isFocusedOrFilled(
              "title",
              release.title
            )} motion-reduce:transition-none`}
          >
            Title:{" "}
          </label>
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
          <label
            className={`input-label ${isFocusedOrFilled(
              "releaseDate",
              release.releaseDate
            )} motion-reduce:transition-none`}
          >
            Release Date:{" "}
          </label>
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
            onBlur={(evt) =>
              handleFocus("releaseDate", evt.target.value !== "")
            }
          />
        </div>
        <div className="relative mb-6">
          <label
            className={`input-label ${isFocusedOrFilled(
              "releaseTypeId",
              release.releaseTypeId
            )} motion-reduce:transition-none`}
          >
            Release Type:
          </label>
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
          <UploadImageWidget
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
        <div className="relative mb-6">
          <SongModal
            bandId={bandId}
            releaseTitle={release.title}
            onSongAdded={handleSongAdded}
            disabled={!release.title}
          />
        </div>
        <div className="relative mb-6">
          <label>Or Choose from songs already uploaded:</label>
          <Multiselect
            options={allSongsByBand}
            displayValue="title"
            selectedValues={songs}
            disablePreSelectedValues
            onSelect={(selectedList, selectedSong) => {
              setSongs([...songs, selectedSong]);
            }}
            onRemove={(selectedList, removedSong) => {
              setSongs(songs.filter((song) => song.id !== removedSong.id));
            }}            
          />
        </div>
        {songs.length > 0 ? (
          <div className="relative mb-6">
            <DnDSongOrder
              songs={songs}
              onReorder={(newSongs) => setSongs(newSongs)}
            />
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          className={`btn-primary ${
            !release.title ||
            !release.releaseDate ||
            !release.releaseTypeId ||
            !release.image.url
              ? "btn-primary-disabled"
              : ""
          }`}
          disabled={
            !release.title ||
            !release.releaseDate ||
            !release.releaseTypeId ||
            !release.image.url
          }
        >
          {releaseId ? "Save Changes" : "Submit Release"}
        </button>
      </form>
    </>
  );
};