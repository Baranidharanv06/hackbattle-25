"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Data array updated to use .mp3 files
const statementsData = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  image: `/ps/${i + 1}.png`,
  sound: `/${i + 1}.mp3`, // Changed to .mp3
}));

export default function ProblemStatements() {
  const [active, setActive] = useState(null);
  const [hoverSound, setHoverSound] = useState(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.5;
    setHoverSound(audio);
  }, []);

  const handleHover = (item) => {
    setActive(item.id);
    if (hoverSound && item.sound) {
      hoverSound.src = item.sound;
      hoverSound.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  const handleMouseLeave = () => {
    setActive(null);
  };

  const handleClick = (item) => {
    setActive(active === item.id ? null : item.id);
    if (hoverSound && item.sound) {
        hoverSound.src = item.sound;
        hoverSound.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  return (
    <div id="ps" className="relative flex flex-col items-center h-screen w-full text-center">
      <Image
        src="/ps.svg"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
        draggable="false"
      />

      <h1 className="text-2xl md:text-[6vh] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse relative z-10 my-[5vh]">
        PROBLEM STATEMENTS
      </h1>

      <div className="flex flex-col md:flex-row w-[85vw] md:w-[60vw] gap-y-[1vh] gap-x-[1vw] md:gap-y-0 h-[80vh] overflow-hidden relative z-10">
        {statementsData.map((item) => (
          <div
            key={item.id}
            className={`relative transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden
              ${active === item.id 
                ? "md:flex-[6] flex-[6] expand-bounce" 
                : active === null 
                  ? "flex-1" 
                  : "md:flex-[0.5] flex-[0.5]"
              }
            `}
            onMouseEnter={() => !("ontouchstart" in window) && handleHover(item)}
            onMouseLeave={() => !("ontouchstart" in window) && handleMouseLeave()}
            onClick={() => handleClick(item)}
          >
            <Image
              src={item.image}
              alt={`Problem Statement ${item.id + 1}`}
              fill
              className="object-cover brightness-110 contrast-110"
              loading="lazy"
              draggable="false"
            />

            {active === item.id && (
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={`Problem Statement ${item.id + 1}`}
                  fill
                  className="object-cover brightness-110 contrast-110"
                  loading="lazy"
                  draggable="false"
                />
            
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold tracking-wider">
                  <p>Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}