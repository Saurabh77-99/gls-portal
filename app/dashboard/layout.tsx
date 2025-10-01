"use client"
import Header from "@/components/StudentProfilePage/Header";
import PaginationFooter from "@/components/StudentProfilePage/PaginationFooter";
import { useStudentStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StudentDetailLayout({ children }: { children: React.ReactNode }) {
    const {fetchStudents} = useStudentStore() as any

    const {isGridViewSelected,toggleGridView} = useStudentStore() as any
    const pathname = usePathname()

    useEffect(()=>{
        fetchStudents()
    },[])

    console.log("pathname",pathname)

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