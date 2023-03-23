import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContext } from "./CalendarProvider";
import { PaletteContext } from "../palette/PaletteProvider";
import { CustomToolbar } from "./CustomToolbar";

const localizer = momentLocalizer(moment);

export const ShowsCalendar = () => {
  const { shows, getShows } = useContext(CalendarContext);
  const { colors, getColors } = useContext(PaletteContext);
  const navigate = useNavigate();

  useEffect(() => {
    getShows();
    getColors();
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
      bandId: show.bandId,
    };
  };

  // Formats all shows once they are fetched
  const formattedShows = shows.map((show) => formatShows(show));

  const eventStyleGetter = (event) => {
    if (colors.length > 0) {
      const colorIndex = event.bandId % colors.length;
      const backgroundColor = colors[colorIndex];

      return {
        style: {
          backgroundColor: backgroundColor,
        },
      };
    }
  };

  // Only loads the Add Event button if the current user is an artist
  const checkIfArtist = () => {
    const localLymiUser = localStorage.getItem("lymi_user");
    const lymiUserObject = JSON.parse(localLymiUser);

    if (lymiUserObject?.isArtist) {
      return (
        <div className="flex justify-end mt-4 mr-4">
          <button className="btn-primary" onClick={() => navigate("/show/add")}>
            Add Event
          </button>
        </div>
      );
    }
  };

  // Ensures the fetch is complete before the calendar is rendered
  if (formattedShows.length === 0 && colors.length === 0) {
    return <p>No Events Found</p>;
  }
  return (
    <>
      {checkIfArtist()}
      <Calendar
        localizer={localizer}
        events={formattedShows}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 240px)", width: '95%', margin: '0 auto', border: 'none' }}
        onSelectEvent={(show) => navigate(`/show/${show.id}`)}
        components={{
          toolbar: CustomToolbar,
        }}
        views={{
          month: true,
          week: false,
          day: false,
          agenda: false,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
