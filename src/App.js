import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import IntroPage from "./pages/IntroPage";
import RegisterPage from "./pages/RegisterPage";
import ExplorePage from "./pages/ExplorePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QRacessPage from "./pages/QRacessPage";
import ContinuePage from "./pages/ContinuePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} exact />
        <Route path="/intro" element={<IntroPage />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/explore" element={<ExplorePage />} exact />
        <Route path="/leaderboard" element={<LeaderboardPage />} exact />
        <Route path="/haedong" element={<QRacessPage />} exact />
        <Route path="/gold" element={<QRacessPage />} exact />
        <Route path="/secret" element={<QRacessPage />} exact />
        <Route path="/continue" element={<ContinuePage />} exact />
      </Routes>
    </>
  );
}

export default App;
