import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Recipes from "./components/Recipes/Recipes";

import "./App.scss";

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/recipes" exact element={<Recipes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
