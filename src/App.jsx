import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import ReportPage from "./components/ReportPage";

function App() {
  localStorage.setItem("userEmail", "test@gmail.com");

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" richColors />
        <TopBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/safhat" element={<MainPage />} />
          <Route path="/:fileName" element={<ReportPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
