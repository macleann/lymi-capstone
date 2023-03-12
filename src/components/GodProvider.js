import { AuthProvider } from "./auth/AuthProvider";
import { CalendarProvider } from "./calendar/CalendarProvider";
import { CloudinaryProvider } from "./cloudinary/CloudinaryProvider";
import { ReleaseProvider } from "./releases/ReleaseProvider";
import { RosterProvider } from "./roster/RosterProvider";

export const GodProvider = (props) => {
  return (
    <>
      <AuthProvider>
        <CalendarProvider>
          <RosterProvider>
            <ReleaseProvider>
              <CloudinaryProvider>{props.children}</CloudinaryProvider>
            </ReleaseProvider>
          </RosterProvider>
        </CalendarProvider>
      </AuthProvider>
    </>
  );
};
