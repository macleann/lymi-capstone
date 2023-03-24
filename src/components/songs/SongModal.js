import { useState, useContext } from "react";
import { SongContext } from "./SongProvider";
import { UploadAudioWidget } from "../cloudinary/UploadAudioWidget";
import Modal from "react-modal";

export const SongModal = ({ bandId, releaseTitle, onSongAdded, disabled }) => {
  const { postNewSong } = useContext(SongContext);
  const [showModal, setShowModal] = useState(false);
  const [song, setSong] = useState({
    title: "",
    audio: {},
  });

  const handleAudioUploadSuccess = (audioData) => {
    setSong({ ...song, audio: audioData });
  };

  const handleAddSong = (e) => {
    e.preventDefault();

    const newSong = {
      title: song.title,
      audio: {
        url: song.audio.url,
        publicId: song.audio.publicId,
        duration: song.audio.duration
      },
    };

    postNewSong(newSong).then((createdSong) => {
      onSongAdded(createdSong);
      setShowModal(false);
      setSong({
        title: "",
        audio: {},
      });
    });
  };

  const customStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      height: 'auto',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      padding: '20px'
    }
  };
  

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`btn-primary${disabled ? " btn-primary-disabled" : ""}`}
        disabled={disabled}
      >
        Upload Song
      </button>
      {showModal && (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            style={customStyles}
            contentLabel="Song Modal"
            className="w-1/6"
        >
          <h2 className="text-xl text-center">Add Song to {releaseTitle}:</h2>
          <form>
            <div>
              <label>Title: </label>
              <input
                type="text"
                className="input-field"
                value={song.title}
                placeholder="The Great Curve"
                onChange={(e) => setSong({ ...song, title: e.target.value })}
                autoFocus
                required
              />
            </div>
            <div>
              <label>Song File: </label>
              <UploadAudioWidget
                onUploadSuccess={handleAudioUploadSuccess}
                setPublicId={`${bandId}/release/${releaseTitle}/${song.title}`}
                disabled={!song.title }
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                handleAddSong(e)
                setShowModal(false)
              }}
              className={`btn-primary ${
                !song.title || !song.audio.url
                  ? "btn-primary-disabled"
                  : ""
              }`}
              disabled={!song.title || !song.audio.url}
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};
