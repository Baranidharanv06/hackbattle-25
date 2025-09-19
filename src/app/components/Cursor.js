"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const cursor = document.createElement("img");
    cursor.src = "/diamond-pickaxe.webp";
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";
    cursor.style.width = "36px";
    cursor.style.height = "36px";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-40%, -40%) scaleX(-1)";
    cursor.style.transition = "transform 0.1s ease";
    cursor.style.willChange = "transform";
    document.body.appendChild(cursor);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pickaxeHit {
        0%   { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        15%  { transform: translate(-40%, -40%) scaleX(-1) rotate(15deg); }
        30%  { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        45%  { transform: translate(-40%, -40%) scaleX(-1) rotate(30deg); }
        60%  { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        75%  { transform: translate(-40%, -40%) scaleX(-1) rotate(45deg); }
        90%  { transform: translate(-40%, -40%) scaleX(-1) rotate(60deg); }
        100% { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
      }
      .triple-hit {
        animation: pickaxeHit 0.6s ease forwards;
      }
    `;
    document.head.appendChild(style);

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const down = () => {
      cursor.classList.remove("triple-hit"); 
      void cursor.offsetWidth; 
      cursor.classList.add("triple-hit");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      cursor.remove();
      style.remove();
    };
  }, []);

  return null;
}
