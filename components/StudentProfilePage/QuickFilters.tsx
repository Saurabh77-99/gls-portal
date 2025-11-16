"use client";

import React from 'react';
import { useStudentStore } from '@/store/store';

const QuickFilters = () => {
  const { activeFilters, toggleFilter } = useStudentStore();

  const filters = [
    'AI/ML',
    'Cyber Security',
    'High CGPA',
    'Hackathon Winner',
    'Industry Experience',
    '0 Backlogs'
  ];

  return (
    <div className="w-full px-8 py-6 bg-white">
      <div className="flex items-center gap-6">
        <h3 className="text-base font-medium text-neutral-700 whitespace-nowrap">QUICK FILTERS</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-neutral-50 border-neutral-400 text-neutral-900 shadow-sm'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;

