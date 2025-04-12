import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SigUp";
import Dashboard from "./components/Dashboard";
import Redirect from "./components/redirect";
import Auth from "./Auth/Auth";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shortId" element={<Redirect />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<Auth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
