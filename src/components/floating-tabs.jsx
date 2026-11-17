"use client";

import { useState, useRef, useLayoutEffect } from "react";

export function FloatingTabs({ tabs, defaultValue, onChange, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab]);

  const updateIndicator = () => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(
        `[data-value="${activeTab}"]`
      );
      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
          opacity: 1,
        });
      }
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative flex items-center gap-1 p-1 rounded-lg bg-zinc-900/40 border border-zinc-800/50 w-fit"
      >
        <div
          className="absolute h-[calc(100%-8px)] bg-zinc-800 rounded-md transition-all duration-300 ease-out"
          style={indicatorStyle}
        />

        {tabs.map((tab) => (
          <button
            key={tab.value}
            data-value={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`relative z-10 px-3.5 py-1.5 cursor-pointer rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.value ? "text-zinc-200" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeContent && (
        <div className="mt-4 animate-in fade-in-0 duration-200">
          {activeContent}
        </div>
      )}
    </div>
  );
}

