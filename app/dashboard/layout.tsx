"use client"
import Header from "@/components/StudentProfilePage/Header";
import { useStudentStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StudentDetailLayout({ children }: { children: React.ReactNode }) {
    const {fetchStudents} = useStudentStore() 
    const {toggleGridView} = useStudentStore() 
    const pathname = usePathname()

    useEffect(()=>{
        fetchStudents()
    },[])

    useEffect(() =>{
      toggleGridView(pathname === '/dashboard');
    },[pathname,toggleGridView])
    
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-start relative">
      <Header/>
      <main className="mt-[73px]">
        {children}
      </main>
    </div>
  );
}