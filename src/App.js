import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/explore" element={<ExplorePage />} exact />
      </Routes>
    </>
  );
}

export default App;
