"use client";

import DashboardStudentProfileCard from "@/components/StudentProfilePage/DashboardStudentProfileCard";
import QuickFilters from "@/components/StudentProfilePage/QuickFilters";
import { useStudentStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {

  const { filteredStudents, students, fetchStudents } = useStudentStore()

  useEffect(() => {
    console.log("Dashboard page loaded successfully!");
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const router = useRouter()

  const displayStudents = filteredStudents.length > 0 ? filteredStudents : students;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <QuickFilters />
      <div className="flex flex-row flex-wrap justify-center gap-4 p-8">
        {
          displayStudents?.length > 0 && 
          displayStudents?.map((student,ind)=>
          <DashboardStudentProfileCard key={ind} student={student} onViewProfile={() => router.push(`/dashboard/student/${student?._id}`)}/>
        )
        }
      </div>
    </div>
  );
};

export default DashboardPage;