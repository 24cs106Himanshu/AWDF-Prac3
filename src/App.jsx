import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects, { DEFAULT_GITHUB_USERNAME } from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const studentName = "Himanshu Varotariya";
  const studentEmail = "24cs106@charusat.edu.in";
  const studentBio =
    "Enthusiastic Computer Science Engineering student passionate about frontend engineering, modern web frameworks, asynchronous state management, and REST API integration.";

  const studentDetails = {
    rollNo: "24CS106",
    department: "Computer Science & Engineering",
    institution: "CSPIT, Charusat University",
  };

  const skillList = [
    "HTML5 & Semantic Markup",
    "CSS3 & Responsive Design",
    "JavaScript (ES6+)",
    "React.js & Hooks (useState, useEffect)",
    "React Router DOM",
    "REST API Integration (Fetch)",
    "Asynchronous Lifecycle Management",
    "Git & GitHub Workflow",
  ];

  return (
    <div className={`portfolio-app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <Header
        name={studentName}
        themeColor={isDarkMode ? "#0f172a" : "#1e3a5f"}
        subtitle="Advanced Web Development Frameworks (ITUE301) — Practical 3"
      />

      <NavBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="portfolio-main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                studentName={studentName}
                studentBio={studentBio}
                studentDetails={studentDetails}
                skillList={skillList}
              />
            }
          />
          <Route
            path="/projects"
            element={<Projects defaultUsername={DEFAULT_GITHUB_USERNAME} />}
          />
          <Route path="/contact" element={<Contact studentEmail={studentEmail} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer email={studentEmail} name={studentName} />
    </div>
  );
}

export default App;
