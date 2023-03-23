import { Outlet, Route, Routes } from "react-router-dom";
import { ShowForm } from "../calendar/ShowForm";
import { ShowsCalendar } from "../calendar/Calendar";
import { ShowDetail } from "../calendar/ShowDetail";
import { Home } from "../home/Home";
import { ReleaseForm } from "../releases/ReleaseForm";
import { BandForm } from "../roster/BandForm";
import { AddMembers } from "../roster/AddMembers";
import { BandDetail } from "../roster/BandDetail";
import { Roster } from "../roster/Roster";
import { EditUser } from "../users/EditUser";
import { Users } from "../users/Users";
import { ReleaseDetailPage } from "../releases/ReleaseDetailPage";

export const ArtistViews = ({ currentUser }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<ShowsCalendar />} />
          <Route path="/show/:showId" element={<ShowDetail />} />
          <Route path="/show/add" element={<ShowForm />} />
          <Route path="/show/:showId/edit" element={<ShowForm />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/roster/band/:bandId" element={<BandDetail />} />
          <Route path="/roster/band/:bandId/edit" element={<BandForm />} />
          <Route
            path="/roster/band/:bandId/release/add"
            element={<ReleaseForm />}
          />
          <Route
            path="/roster/band/:bandId/members/add"
            element={<AddMembers />}
          />
          <Route
            path="/roster/band/:bandId/release/:releaseId"
            element={<ReleaseDetailPage />}
          />
          <Route
            path="/roster/band/:bandId/release/:releaseId/edit"
            element={<ReleaseForm />}
          />
          {currentUser.isAdmin ? (
            <>
              <Route path="/roster/band/add" element={<BandForm />} />
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
