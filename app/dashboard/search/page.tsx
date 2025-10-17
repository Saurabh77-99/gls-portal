"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Student, useStudentStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { SkillBadges } from '@/components/ui/Badge';


type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const Image = ({ src, alt, width, height, className }: ImageProps) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

// const Badge = ({
//   children,
//   variant = "default",
//   className = "",
// }: {
//   children: React.ReactNode
//   variant?: "default" | "outline" | "destructive" | "secondary" | "success" | "warning"
//   className?: string
// }) => {
//   const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
//   const variants = {
//     default: "bg-gray-100 text-gray-800",
//     outline: "border border-gray-300 text-gray-700 bg-white",
//     destructive: "bg-pink-100 text-pink-700",
//     secondary: "bg-blue-100 text-blue-700",
//     success: "bg-green-100 text-green-700",
//     warning: "bg-orange-100 text-orange-700",
//   };

//   return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>;
// };

const StudentCardComponent = ({ student, onViewProfile }: { student : Student ; onViewProfile: (id: string) => void }) => {
  console.log("Student Data:", student); // Debugging line to check student data
  return (
    <div className="bg-neutral-100 border border-neutral-200 rounded-3xl p-4">
      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={student?.profilePhoto}
            alt={student?.name}
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-900 mb-1">{student?.name}</h3>
          <p className="text-neutral-600 text-sm font-medium mb-1">{student?.branch}</p>
          <p className="text-neutral-600 text-sm font-medium">
            {student?.batch} • {student?.semester} • {student?.specialization}
          </p>
        </div>
      </div>

      {/* Horizontal line */}

      <hr className="border-neutral-200 mb-3" />

      {/* Description */}
      <p className="text-neutral-700 text-sm font-medium my-3">
        {student?.overview}
      </p>

      {/* Badges and View Profile */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {<SkillBadges skills={student?.tags || []} size="small" />}
        </div>
        
        <button
          onClick={() => onViewProfile(student?._id)}
          className="flex items-center gap-1 text-[#5B2CE7] text-[16px] font-medium transition-colors cursor-pointer"
        >
          View Profile
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};


const Page = () => {

    const {
        searchResults,
        searchQuery,
    } = useStudentStore()

    const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleViewProfile = (studentId: string) => {
    router.push(`/dashboard/student/${studentId}`);
  };

  return (
    <div className="min-h-screen w-screen bg-neutral-100">
      <div className="px-8 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl font-medium text-gray-900">
              Showing Results for &quot;{searchQuery}&quot;
            </h1>
          </div>
          
          <div></div> {/* Empty div for spacing */}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium text-gray-700">
              {searchResults?.length} RESULT{searchResults?.length !== 1 ? 'S' : ''} FOUND
            </p>
            <div className="flex-1 h-[1px] bg-neutral-200"></div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {searchResults.map((student) => (
            <StudentCardComponent
              key={student._id}
              student={student}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* No results state */}
        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No students found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;