import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Category } from "./components/Category/Category";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Sidebar>
      </Router>
    </>
  );
}

export default App;
