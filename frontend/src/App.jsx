import "tailwindcss";
import {Routes,BrowserRouter,Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SigUp";
import Dashboard from "./components/Dashboard";
import Redirect from "./components/redirect";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/:shortId" element={<Redirect/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/SignIn" element={<SignIn/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/dashBoard" element={<Dashboard/>}></Route>
      <Route path="/create" element={<div>create</div>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
