"use client";

import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

export const FilterSelector = ({ 
  items = [], 
  activeFilters: controlledActiveFilters, 
  onFilterChange,
  theme = "dark"
}) => {
  const isDark = theme === "dark";
  const [internalActiveFilters, setInternalActiveFilters] = useState(
    items.length > 0 ? [items[0]?.id || "", items[1]?.id || ""].filter(Boolean) : []
  );

  const activeFilters = controlledActiveFilters !== undefined ? controlledActiveFilters : internalActiveFilters;

  const toggleFilter = (id) => {
    let newFilters;
    if (activeFilters.includes(id)) {
      newFilters = activeFilters.filter((i) => i !== id);
    } else {
      newFilters = [...activeFilters, id];
    }
    
    if (controlledActiveFilters === undefined) {
      setInternalActiveFilters(newFilters);
    }
    onFilterChange?.(newFilters);
  };

  const selectedFiltersMap = activeFilters.map(id => items.find(f => f.id === id)).filter(Boolean);
  const availableFiltersMap = items.filter(f => !activeFilters.includes(f.id));

  return (
    <div className="w-full max-w-sm mx-auto font-inter">
      <LayoutGroup>
        <motion.div
          layout
          transition={{
            layout: {
              type: "tween",
              duration: 0.20,
              ease: "easeOut",
            },
          }}
          className="flex flex-wrap gap-2 mb-6 min-h-[32px]"
        >
          {selectedFiltersMap.map((filter) => (
            <FilterChip
              key={filter.id}
              filter={filter}
              isSelected={true}
              onClick={() => toggleFilter(filter.id)}
            />
          ))}
        </motion.div>

        <motion.div
          layout
          transition={{
            layout: {
              type: "tween",
              duration: 0.20,
              ease: "easeOut",
            },
          }}
          className={`rounded-xl border p-5 min-h-[10rem] overflow-hidden shadow-2xl flex flex-col ${
            isDark 
              ? "bg-zinc-950 border-zinc-800 shadow-black/50" 
              : "bg-zinc-50 border-zinc-200 shadow-black/5"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.h3 layout className={`text-sm font-medium ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
              Select filter
            </motion.h3>
            <div className="flex items-center gap-2">
              {selectedFiltersMap.length > 0 && (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-xs text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors"
                  onClick={() => {
                    if (controlledActiveFilters === undefined) {
                        setInternalActiveFilters([]);
                    }
                    onFilterChange?.([]);
                  }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </div>

          <motion.div
            layout
            transition={{
              layout: {
                type: "tween",
                duration: 0.20,
                ease: "easeOut",
              },
            }}
            className="flex flex-wrap gap-2 flex-1 relative content-start"
          >
          {availableFiltersMap.map((filter) => (
            <FilterChip
              key={filter.id}
              filter={filter}
              isSelected={false}
              onClick={() => toggleFilter(filter.id)}
            />
          ))}
          {availableFiltersMap.length === 0 && (
            <div className={`absolute inset-0 flex items-center justify-center text-sm font-medium select-none pointer-events-none ${isDark ? "text-zinc-600/50" : "text-zinc-400"}`}>
              im empty pls fill me up :(
            </div>
          )}
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

const FilterChip = ({ filter, isSelected, onClick }) => {
  return (
    <motion.button
      layoutId={`filter-${filter.id}`}
      onClick={onClick}
      className={`
        relative flex items-center justify-center gap-1.5 px-3 py-1.5 text-[13px] font-medium border-[2px] border-dotted rounded-full
        cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-700
        ${filter.color}
      `}
      transition={{
        layout: {
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        },
      }}
    >
      <span className="relative z-10">{filter.label}</span>
      {isSelected && (
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="opacity-70 hover:opacity-100 ml-1.5"
          >
            <path
              d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}
    </motion.button>
  );
};

