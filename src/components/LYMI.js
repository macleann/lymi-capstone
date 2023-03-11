import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { GodProvider } from "./GodProvider";
import { Footer } from "./nav/Footer";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./views/ApplicationViews";

export const LYMI = () => {
  return (
    <GodProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
                <>
                    <NavBar />
                    <ApplicationViews />
                    <Footer/>
                </>
        } />
        </Routes>
    </GodProvider>
  );
};
