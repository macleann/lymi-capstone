import { createContext, useState } from "react";

export const ReleaseContext = createContext();

export const ReleaseProvider = (props) => {
  const [releases, setReleases] = useState([]);
  const [releaseTypes, setReleaseTypes] = useState([])

  const getReleases = () => {
    return fetch(
      `http://localhost:8088/releases?_expand=band&_sort=releaseDate&_order=desc`
    ).then((response) => response.json());
  };

  const getReleaseById = (id) => {
    return fetch(`http://localhost:8088/releases/${id}?_expand=band&_expand=releaseType`)
      .then(response => response.json())
  }

  const getReleasesByBandId = (bandId) => {
    return fetch(
      `http://localhost:8088/releases?bandId=${bandId}&_expand=band&_expand=releaseType&_sort=releaseDate&_order=desc`
    ).then((response) => response.json());
  };

  const getRecentReleases = () => {
    return fetch(
      `http://localhost:8088/releases?_expand=band&_expand=releaseType&_sort=releaseDate&_order=desc&_limit=10`
    ).then((response) => response.json());
  };

  const getReleaseTypes = () => { 
    return fetch(`http://localhost:8088/releaseTypes`)
      .then(response => response.json())
  }

  const postNewRelease = (release) => {
    return fetch(`http://localhost:8088/releases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(release),
    }).then((response) => response.json());
  };

  const putUpdatedRelease = (release) => {
    return fetch(`http://localhost:8088/releases/${release.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(release),
    }).then((response) => response.json());
  }

  const deleteRelease = (releaseId) => {
    return fetch(`http://localhost:8088/releases/${releaseId}`, {
      method: "DELETE",
    });
  };

  return (
    <ReleaseContext.Provider
      value={{
        releases,
        setReleases,
        releaseTypes,
        setReleaseTypes,
        getReleases,
        getReleaseById,
        getReleasesByBandId,
        getRecentReleases,
        getReleaseTypes,
        postNewRelease,
        putUpdatedRelease,
        deleteRelease,
      }}
    >
      {props.children}
    </ReleaseContext.Provider>
  );
};
