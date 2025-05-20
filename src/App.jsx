import React from "react";
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DomainPage from './pages/DomainPage'
import OurTeamPage from "./pages/OurTeamPage";
import EventsPage from "./pages/EventsPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/domains" element={<DomainPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/ourteam" element={<OurTeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
      </Routes>
    </>
  );
};

export default App;
