import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContext } from "./CalendarProvider";

const localizer = momentLocalizer(moment);

export const ShowsCalendar = () => {
  const { shows, getShows } = useContext(CalendarContext);
  const navigate = useNavigate();

  useEffect(() => {
    getShows();
  }, []);

  /* Formats a show object for react-big-calender,
    Specifically, the title, start, and end times
    Most importantly, the times must utilize moment and momentLocalizer */
  const formatShows = (show) => {
    return {
      id: show.id,
      title: `${show.band.name} at ${show.venue}`,
      start: moment(`${show.date} ${show.time}`, "YYYY-MM-DD h:mm").toDate(),
      end: moment(`${show.date} ${show.time}`, "YYYY-MM-DD h:mm").toDate(),
    };
  };

  // Formats all shows once they are fetched
  const formattedShows = shows.map((show) => formatShows(show));

  // Only loads the Add Event button if the current user is an artist
  const checkIfArtist = () => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    if (lymiUserObject?.isArtist) {
      return <button onClick={() => navigate("/show/add")}>Add Event</button>;
    }
  };

  // Ensures the fetch is complete before the calendar is rendered
  if (formattedShows.length === 0) {
    return <p>No Events Found</p>;
  }
  return (
    <>
      {checkIfArtist()}
      <div>
        <Calendar
          localizer={localizer}
          events={formattedShows}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={(show) => navigate(`/show/${show.id}`)}
        />
      </div>
    </>
  );
};
