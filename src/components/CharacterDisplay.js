'use client';

import React from 'react';
import Image from 'next/image';

export default function CharacterDisplay({ characterSrc, className, style }) {
  return (
    <div
      className={`relative w-full max-w-xs mx-auto aspect-square ${className}`}
      style={style}
    >
      <Image
        key={characterSrc}
        src={characterSrc}
        alt="Character Animation"
        fill 
        style={{ objectFit: 'contain' }}
        className="select-none animate-fade-in-out"
        unoptimized={true} 
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
}