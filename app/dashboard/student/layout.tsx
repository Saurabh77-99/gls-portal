"use client"
import Header from "@/components/StudentProfilePage/Header";
import PaginationFooter from "@/components/StudentProfilePage/PaginationFooter";
import { useStudentStore } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function StudentDetailLayout({ children }: { children: React.ReactNode }) {
    const {setCurrentStudentById} = useStudentStore() as any

        const params = useParams();
        const studentId = params.id as string

            useEffect(()=>{
                setCurrentStudentById(studentId)
        },[params])
        
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-start relative">
      <main>
        {children}
      </main>
      <PaginationFooter />
    </div>
  );
}