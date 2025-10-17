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
    if(searchQuery.trim() === "") return;
    searchStudents(searchQuery)
    router.push(`/dashboard/search`)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.40)" }}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between w-[800px] p-5 absolute border-4 border-[#9D80F1] rounded-[20px] bg-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Search className="h-10 w-10 text-neutral-700 flex-shrink-0" />
        <input
          type="text"
          autoFocus
          placeholder="Search students..."
          className="flex-1 bg-transparent text-[32px] font-medium text-neutral-700 placeholder-neutral-400 mx-4 focus:outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="flex-shrink-0 p-2 bg-[#5B2CE7] text-white rounded-[6px]  focus:outline-none transition-all cursor-pointer"
          onClick={handleSearch}
        >
          <ArrowRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default SearchModal