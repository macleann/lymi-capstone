import { useState, useEffect } from "react";

export const MusicPlayer = ({ tracks }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col">
      <div className="track-list">
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => playTrack(track)}
            className={`cursor-pointer my-1 p-1 ${
              index % 2 === 0 ? "bg-white/20" : "bg-white/40"
            }`}
          >
            {track.title}
          </div>
        ))}
      </div>
      {currentTrack && (
        <div className="mt-4">
          <h4 className="text-xl">{currentTrack.title}</h4>
          <audio
            className="mt-2 mx-auto"
            src={currentTrack.audio.url}
            controls
            controlsList="nodownload noplaybackrate"
            autoPlay={isPlaying}
            onEnded={togglePlay}
          />
        </div>
      )}
    </div>
  );
};
