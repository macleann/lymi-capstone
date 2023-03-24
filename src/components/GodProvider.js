import { AuthProvider } from "./auth/AuthProvider";
import { CalendarProvider } from "./calendar/CalendarProvider";
import { CloudinaryProvider } from "./cloudinary/CloudinaryProvider";
import { PaletteProvider } from "./palette/PaletteProvider";
import { ReleaseProvider } from "./releases/ReleaseProvider";
import { RosterProvider } from "./roster/RosterProvider";
import { SongProvider } from "./songs/SongProvider";

export const GodProvider = (props) => {
  return (
    <>
      <AuthProvider>
        <CalendarProvider>
          <RosterProvider>
            <ReleaseProvider>
              <PaletteProvider>
                <SongProvider>
                  <CloudinaryProvider>
                    {props.children}
                  </CloudinaryProvider>
                </SongProvider>
              </PaletteProvider>
            </ReleaseProvider>
          </RosterProvider>
        </CalendarProvider>
      </AuthProvider>
    </>
  );
};
