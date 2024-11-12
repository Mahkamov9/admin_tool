import React from "react";
import { Category } from "./components/Category/Category";
// import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Brands from "./pages/Brands/Brands";
import LoginFinal from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginFinal />} />
          <Route path="/" element={<Home />}>
            <Route path="category" element={<Category />} />
            <Route path="brands" element={<Brands />} />
            <Route path="dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
