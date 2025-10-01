"use client"

import { useStudentStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

const PaginationFooter = () => {
  const router = useRouter();
  const { 
    currentIndex, 
    totalStudents,
    students,
    goToNextStudent, 
    goToPrevStudent,
    loading 
  } = useStudentStore();

  const handleNext = async () => {
    const nextStudentId = await goToNextStudent(); 
    if (nextStudentId) {
      router.push(`/dashboard/student/${nextStudentId}`);
    }
  };

  const handlePrev = () => {
    const prevStudentId = goToPrevStudent();
    if (prevStudentId) {
      router.push(`/dashboard/student/${prevStudentId}`);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = loading || (totalStudents > 0 && currentIndex + 1 >= totalStudents);

  return (
    <footer className="fixed bottom-0 w-full bg-neutral-100 border-t border-neutral-200">
      <div className=" mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-700">
            {totalStudents > 0 ? (
              <span>Student <b>{currentIndex + 1}</b> of <b>{totalStudents}</b></span>
            ) : ( <span>Loading...</span> )}
          </div>
           <div className="text-[16px] text-neutral-500">
           Reminder: NO using/sharing/distributing of student data outside of recruitment purposes
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outlined" onClick={handlePrev} disabled={isPrevDisabled} className="px-5 py-2 text-sm font-semibold rounded-lg border border-neutral-300 bg-white text-neutral-800 transition-colors disabled:opacity-50 hover:bg-neutral-50">
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isNextDisabled} className="px-5 py-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white transition-colors disabled:opacity-50 disabled:bg-purple-300 hover:bg-purple-700">
              {loading && currentIndex + 1 >= students.length ? 'Loading...' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PaginationFooter