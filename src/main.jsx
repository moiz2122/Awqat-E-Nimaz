import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import PrayerTimes from "./PrayerTimesDisplay.jsx";
import BackgroundAudio from './backgroundaudio.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrayerTimes />
    <BackgroundAudio />
  </StrictMode>
);
