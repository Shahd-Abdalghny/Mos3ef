import React from 'react';
import ChatBotButton from './components/ChatBotButton';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { SignUp } from './Pages/Auth/SighnUp';
import { LogIn } from './Pages/Auth/LogIn';
import { PatientProfile } from './Pages/Patient/PatientProfile';

function App() {
  return (
    <>
      <div className="relative bg-cover bg-center flex flex-col items-center w-full ">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/LogIn" element={<LogIn/>} />
          <Route path="/PatientProfile" element={<PatientProfile/>} />
        </Routes>
      </div>
      <ChatBotButton/>
    </>
  )
}

export default App;