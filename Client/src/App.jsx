import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader"; // Update the path
import Main from './Pages/Main'
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="relative main-div">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-radial-gradient"></div>

      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Main />} />
          {/* Other routes go here */}
        </Routes>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
