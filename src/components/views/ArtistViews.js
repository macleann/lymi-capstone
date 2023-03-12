import { Outlet, Route, Routes } from "react-router-dom";
import { AddShow } from "../calendar/AddShow";
import { ShowsCalendar } from "../calendar/Calendar";
import { ShowDetail } from "../calendar/ShowDetail";
import { Home } from "../home/Home";
import { AddRelease } from "../releases/AddRelease";
import { AddBand } from "../roster/AddBand";
import { AddMembers } from "../roster/AddMembers";
import { BandDetail } from "../roster/BandDetail";
import { Roster } from "../roster/Roster";
import { EditUser } from "../users/EditUser";
import { Users } from "../users/Users";

export const ArtistViews = ({ currentUser }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<ShowsCalendar />} />
          <Route path="/show/:showId" element={<ShowDetail />} />
          <Route path="/show/add" element={<AddShow />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/roster/band/:id" element={<BandDetail />} />
          <Route
            path="/roster/band/:bandId/release/add"
            element={<AddRelease />}
          />
          <Route
            path="/roster/band/:bandId/members/add"
            element={<AddMembers />}
          />
          {currentUser.isAdmin ? (
            <>
              <Route path="/roster/band/add" element={<AddBand />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId/edit" element={<EditUser />} />
            </>
          ) : (
            <></>
          )}
        </Route>
      </Routes>
    </>
  );
};
