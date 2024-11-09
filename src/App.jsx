import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Category } from "./components/Category/Category";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Brands } from "./pages/Brands/Brands";



function App() {

  return (
    <>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brands" element={<Brands/>} />
          </Routes>
        </Sidebar>
      </Router>
    </>
  );
}

export default App;
