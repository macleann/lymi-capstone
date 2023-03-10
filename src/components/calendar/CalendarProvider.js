import { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = (props) => {
  const [shows, setShows] = useState([]);

  const getShows = () => {
    return fetch(`http://localhost:8088/shows?_expand=band`)
      .then((response) => response.json())
      .then((data) => setShows(data));
  };

  const getShowById = (id) => {
    return fetch(`http://localhost:8088/shows/${id}?_expand=band`).then(
      (response) => response.json()
    );
  };

  const postNewShow = (show) => {
    return fetch(`http://localhost:8088/shows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(show),
    }).then((response) => response.json());
  };

  const putUpdatedShow = (show) => {
    return fetch(`http://localhost:8088/shows/${show.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(show)
    })
      .then(response => response.json())
  }

  const deleteShow = (showId) => {
    return fetch(`http://localhost:8088/shows/${showId}`, {
      method: "DELETE",
    });
  };

  return (
    <CalendarContext.Provider
      value={{ shows, setShows, getShows, getShowById, postNewShow, putUpdatedShow, deleteShow }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};
