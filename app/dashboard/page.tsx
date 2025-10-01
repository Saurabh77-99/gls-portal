"use client";

import DashboardStudentProfileCard from "@/components/StudentProfilePage/DashboardStudentProfileCard";
import { useStudentStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {

  const {students} = useStudentStore() as any

  useEffect(() => {
    console.log("Dashboard page loaded successfully!");
  }, []);

  const router = useRouter()

  return (
    <div className="min-h-screen w-full flex flex-row flex-wrap justify-center gap-4 bg-gray-50 p-8">
      {
        students?.length > 0 && 
        students?.map((student,ind)=>
        <DashboardStudentProfileCard key={ind} student={student} onViewProfile={() => router.push(`/dashboard/student/${student?._id}`)}/>
      )
      }
    </div>
  );
};

export default DashboardPage;