import { createContext, useState } from "react";

export const RosterContext = createContext();

export const RosterProvider = (props) => {
  const [bands, setBands] = useState([]);

  const getBands = () => {
    return fetch(`http://localhost:8088/bands?_embed=artistBands&_embed=releases&_sort=name&_order=asc`).then(
      (response) => response.json()
    );
  };

  const getBandById = (id) => {
    return fetch(
      `http://localhost:8088/bands/${id}?_embed=artistBands&_embed=releases`
    ).then((response) => response.json());
  };

  const postNewBand = (band) => {
    return fetch(`http://localhost:8088/bands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(band),
    }).then((response) => response.json());
  };

  const putUpdatedBand = (band) => {
    return fetch(`http://localhost:8088/bands/${band.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(band),
    }).then((response) => response.json());
  }

  const postNewArtistBand = (artistBand) => {
    return fetch(`http://localhost:8088/artistBands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artistBand),
    }).then((response) => response.json());
  };

  return (
    <RosterContext.Provider
      value={{
        bands,
        setBands,
        getBands,
        getBandById,
        postNewBand,
        putUpdatedBand,
        postNewArtistBand
      }}
    >
      {props.children}
    </RosterContext.Provider>
  );
};
