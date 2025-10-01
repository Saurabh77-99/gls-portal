"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudentStore } from '@/store/store';

const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "destructive" | "secondary" | "success" | "warning"
  className?: string
}) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  const variants = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
    destructive: "bg-pink-100 text-pink-700",
    secondary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
  };

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>;
};

// Student Card Component (embedded for completeness)
const StudentCardComponent = ({ student, onViewProfile }) => {

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={student.profileImage}
            alt={student.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{student.name}</h3>
          <p className="text-gray-600 text-sm mb-1">{student.degree}</p>
          <p className="text-gray-600 text-sm">
            {student.batch} • {student.semester} • {student.specialization}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {student.description}
      </p>

      {/* Badges and View Profile */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {student?.tags?.map((badge, index) => (
            <Badge key={index} variant={badge.variant}>
              {badge.icon && <span className="mr-1">{badge.icon}</span>}
              {badge.text}
            </Badge>
          ))}
        </div>
        
        <button
          onClick={() => onViewProfile(student.id)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
        >
          View Profile
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Sample data - replace with your actual data
const sampleStudents = [
  {
    id: "1",
    name: "Aarav Patel",
    degree: "B.Tech - Computer Science & Engineering",
    batch: "Batch 2022-26",
    semester: "Sem 7",
    specialization: "AI/ML",
    description: "AI/ML enthusiast • Built a Gujarati TTS system • Likes to explore core Machine Learning",
    profileImage: "https://placehold.co/64x64/7c56ec/white?text=AP&font=sans",
    badges: [
      { text: "Batch Topper", variant: "destructive", icon: "🏆" },
      { text: "Hackathon Winner", variant: "secondary", icon: "🏆" },
      { text: "National Level Achievement", variant: "success", icon: "🎖️" },
      { text: "High CGPA", variant: "warning", icon: "🎓" },
    ]
  }
];

interface SearchResultsPageProps {
  searchQuery?: string;
  students?: typeof sampleStudents;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = () => {

    const {
        searchResults,
        searchQuery,
    } = useStudentStore() as any

  const handleGoBack = () => {
    // Handle navigation back
    console.log("Go back clicked");
  };

  const handleViewProfile = (studentId: string) => {
    // Handle view profile navigation
    console.log(`View profile for student: ${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Showing Results for "{searchQuery}"
            </h1>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700">
            {searchResults?.length} RESULT{searchResults?.length !== 1 ? 'S' : ''} FOUND
          </p>
          <div className="h-px bg-gray-200 mt-2"></div>
        </div>

        {/* Results */}
        <div className="space-y-6">
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

export default SearchResultsPage;