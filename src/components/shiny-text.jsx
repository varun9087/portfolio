"use client";

import React from "react";

export function ShinyText({ 
  children, 
  className = "", 
  shimmerWidth = 100,
  speed = 5,
  ...props 
}) {
  return (
    <span
      style={{
        "--shiny-width": `${shimmerWidth}px`,
        "--shiny-speed": `${speed}s`,
      }}
      className={`
        siddz-shiny relative inline-block
        text-neutral-600/50 dark:text-neutral-400/60
        bg-clip-text
        bg-no-repeat
        bg-linear-to-r from-transparent via-black/60 via-50% to-transparent dark:via-white/60
        ${className}
      `}
      {...props}
    >
      {children}
      <style>{`
        @keyframes shiny-text {
          0% {
            background-position: calc(-100% - var(--shiny-width)) 0;
          }
          40% {
            background-position: calc(100% + var(--shiny-width)) 0;
          }
          100% {
            background-position: calc(100% + var(--shiny-width)) 0;
          }
        }
        .siddz-shiny {
          animation: shiny-text var(--shiny-speed) infinite ease-in-out;
          background-size: var(--shiny-width) 100%;
        }
      `}</style>
    </span>
  );
}



