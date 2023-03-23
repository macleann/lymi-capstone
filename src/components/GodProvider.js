import { AuthProvider } from "./auth/AuthProvider";
import { CalendarProvider } from "./calendar/CalendarProvider";
import { CloudinaryProvider } from "./cloudinary/CloudinaryProvider";
import { PaletteProvider } from "./palette/PaletteProvider";
import { ReleaseProvider } from "./releases/ReleaseProvider";
import { RosterProvider } from "./roster/RosterProvider";

export const GodProvider = (props) => {
  return (
    <>
      <AuthProvider>
        <CalendarProvider>
          <RosterProvider>
            <ReleaseProvider>
              <PaletteProvider>
                <CloudinaryProvider>{props.children}</CloudinaryProvider>
              </PaletteProvider>
            </ReleaseProvider>
          </RosterProvider>
        </CalendarProvider>
      </AuthProvider>
    </>
  );
};
