import React, { useEffect, useState } from "react";
import useVoiceTranscription from "./hooks/useVoiceTranscription";
import useAIQuestionGenerator from "./hooks/useAIQuestionGenerator";
import VideoCallInterface from "./components/VideoCallInterface";
import LiveTranscription from "./components/LiveTranscription";
import LiveAISuggestions from "./components/LiveAISuggestions";
import { mockParticipants } from "./mockData/mockParticipants";
import PatientInfo from "./components/PatientInfo";
import { mockPatient } from "./mockData/mockPatient";
import Stethoscope from "./images/Stethoscope";
import Users from "./images/Users";
import Calendar from "./images/Calendar";
import Clock from "./images/Clock";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import DoctorPage from "./components/DoctorPage";
import PatientPage from "./components/PatientPage";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
            
const App = () => {
    
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/:id" element={<DoctorPage />} />
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/patient/:id" element={<PatientPage />} />
    </Routes>
  )}

export default App;