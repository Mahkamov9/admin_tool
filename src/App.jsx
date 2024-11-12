import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Category } from "./components/Category/Category";
import { Dashboard } from "./components/Dashboard/Dashboard";
import LoginFinal from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { Brands } from "./pages/Brands/Brands";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginFinal />} />
          <Route path="/" element={<Home />}>
            <Route path="category" element={<Category />} />
            <Route path="brands" element={<Brands/>} />
            <Route path="dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
