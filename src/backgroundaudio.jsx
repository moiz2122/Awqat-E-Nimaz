import React, { useRef, useEffect } from "react";

const BackgroundAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {
  const audio = audioRef.current;

  const tryPlay = () => {
    if (audio) {
      audio.volume = 0.7;
      audio.play().catch((err) => {
        console.log("Autoplay failed:", err);
      });
    }
  };

  // Try on mount
  tryPlay();

  // Also try after user interaction
  window.addEventListener("click", tryPlay);

  return () => {
    window.removeEventListener("click", tryPlay);
  };
}, []);

  return (
    <audio
      ref={audioRef}
      src="/ElevenLabs_2025-05-24T21_32_29_Brian_pre_sp75_s100_sb82_se0_b_m2.mp3"
      loop
      autoPlay
      hidden
    />
  );
};

export default BackgroundAudio;
