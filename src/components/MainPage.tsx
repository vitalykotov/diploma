import React from "react";
import ArtistsSection from "./ArtistsSection";
import TracksSection from "./TracksSection";

const MainPage: React.FC = () => (
  <main>
    <h1 className="main-title">Music</h1>
    <ArtistsSection />
    <TracksSection />
  </main>
);

export default MainPage;
