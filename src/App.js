import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import ExplorePage from "./pages/ExplorePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TestPage from "./pages/TestPage";
import ContinuePage from "./pages/ContinuePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/explore" element={<ExplorePage />} exact />
        <Route path="/test" element={<TestPage />} exact />
        <Route path="/leaderboard" element={<LeaderboardPage />} exact />
        <Route path="/haedong" element={<TestPage />} exact />
        <Route path="/gold" element={<TestPage />} exact />
        <Route path="/secret" element={<TestPage />} exact />
        <Route path="/continue" element={<ContinuePage />} exact />
      </Routes>
    </>
  );
}

export default App;
