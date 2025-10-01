"use client"

import StudentDetailsPage from '@/components/StudentProfilePage/StudentDetailsPage'
import { useStudentStore } from '@/store/store'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    const params = useParams();
    const studentId = params.id as string
    const { students,
        currentIndex,
        setCurrentStudentById,
        fetchStudents,
        error } = useStudentStore() as any
    const currentStudent = students[currentIndex]

    useEffect(() => {
        if (students.length === 0) {
            fetchStudents();
        }
    }, [students.length, fetchStudents]);

    useEffect(()=>{
        setCurrentStudentById(studentId)
    },[params])


    return (
        <div className='min-h-screen min-w-screen bg-neutral-100 overflow-scroll'>
            <StudentDetailsPage currentStudent={currentStudent} />
        </div>
    )
}

export default page