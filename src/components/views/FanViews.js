import { Outlet, Route, Routes } from "react-router-dom";
import { ShowsCalendar } from "../calendar/Calendar";
import { ShowDetail } from "../calendar/ShowDetail";
import { Home } from "../home/Home";
import { BandDetail } from "../roster/BandDetail";
import { Roster } from "../roster/Roster";

export const FanViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<ShowsCalendar />} />
          <Route path="/show/:showId" element={<ShowDetail />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/roster/band/:id" element={<BandDetail />} />
        </Route>
      </Routes>
    </>
  );
};
