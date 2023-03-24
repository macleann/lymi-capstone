import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [releaseSongs, setReleaseSongs] = useState([]);

  const getReleaseSongsByRelease = (releaseId) => {
    return fetch(
      `http://localhost:8088/releaseSongs?releaseId=${releaseId}&_expand=release&_expand=song`
    ).then((response) => response.json());
  };

  const getReleaseSongsByBand = (bandId) => {
    return fetch(
      `http://localhost:8088/releaseSongs?bandId=${bandId}&_expand=release&_expand=song`
    ).then((response) => response.json());
  }

  const postNewSong = (song) => {
    return fetch(`http://localhost:8088/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    }).then((response) => response.json());
  };

  const putUpdatedSong = (song) => {
    return fetch(`http://localhost:8088/songs/${song.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    }).then((response) => response.json());
  };

  const postNewReleaseSong = (releaseSong) => {
    return fetch(`http://localhost:8088/releaseSongs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(releaseSong),
    }).then((response) => response.json());
  };

  const putUpdatedReleaseSong = (releaseSong) => {
    return fetch(`http://localhost:8088/releaseSongs/${releaseSong.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(releaseSong),
    }).then((response) => response.json());
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        releaseSongs,
        setReleaseSongs,
        getReleaseSongsByRelease,
        getReleaseSongsByBand,
        postNewSong,
        putUpdatedSong,
        postNewReleaseSong,
        putUpdatedReleaseSong,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
};
