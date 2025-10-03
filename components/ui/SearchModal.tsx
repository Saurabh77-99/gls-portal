"use client"

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useStudentStore } from '@/store/store';
import { useRouter } from 'next/navigation';

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const [searchQuery,setSearchQuery] = useState<string>("")
    const {searchStudents} = useStudentStore()
    const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSearch = () =>{
    searchStudents(searchQuery)
    router.push(`/dashboard/search`)
    onClose()
  }

  return (

    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-purple-200/50
          flex items-center gap-4 p-4
          transform transition-all duration-300 ease-in-out
          animate-fade-in-down
        "
        onClick={(e) => e.stopPropagation()}
      >
        <Search className="h-7 w-7 text-slate-400 flex-shrink-0 ml-2" />
        <input
          type="text"
          autoFocus
          placeholder="Aarav Patel"
          className="w-full bg-transparent text-2xl text-slate-800 placeholder-slate-400 focus:outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="
            flex-shrink-0 p-3 bg-[#5B2CE7] text-white rounded-2xl
            hover:bg-[#4818D7] focus:outline-none focus:ring-2 focus:ring-[#5B2CE7] focus:ring-offset-2
            transition-all transform hover:scale-105
          "
          onClick={handleSearch}
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchModal