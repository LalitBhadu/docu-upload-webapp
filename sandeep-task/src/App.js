import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskCompo from "./TaskCompo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TaskCompo />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
