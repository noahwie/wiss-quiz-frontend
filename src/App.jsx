import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";
import QuestionManager from "./pages/QuestionManager";
import Impressum from "./pages/Impressum";
import Rules from "./pages/Rules";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";
import Forbidden from "./pages/Forbidden";
import LeaderboardPage from "./pages/Leaderboard";
import UserStatsPage from "./pages/UserStatsPage";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="regeln" element={<Rules />} />
        <Route path="blabli" element={<Impressum />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="user-stats" element={<UserStatsPage />} />
        <Route path="forbidden" element={<Forbidden />} /> {/* ← NEU */}
        {/* Geschützte Routen */}
        <Route
          path="quiz"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        {/* Admin-geschützte Route */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <QuestionManager />
            </ProtectedRoute>
          }
        />
        {/* 404 Seite */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
