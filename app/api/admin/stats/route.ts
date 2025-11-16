import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import Recruiter from "@/models/Recruiter";
import { validateAdminAuthentication } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const auth = validateAdminAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();

    const [
      totalStudents,
      studentsByBranch,
      studentsBySpecialization,
      averageCgpa,
      studentsWithHighCgpa,
      recentStudents,
      totalRecruiters
    ] = await Promise.all([
      Student.countDocuments(),
      Student.aggregate([
        { $group: { _id: "$branch", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Student.aggregate([
        { $group: { _id: "$specialization", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Student.aggregate([
        { $group: { _id: null, avgCgpa: { $avg: "$cgpa" } } }
      ]),
      Student.countDocuments({ cgpa: { $gte: 8.5 } }),
      Student.find().sort({ createdAt: -1 }).limit(10).select('name branch cgpa createdAt'),
      Recruiter.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalStudents,
          totalRecruiters,
          averageCgpa: averageCgpa[0]?.avgCgpa?.toFixed(2) || 0,
          highCgpaStudents: studentsWithHighCgpa
        },
        distribution: {
          byBranch: studentsByBranch,
          bySpecialization: studentsBySpecialization
        },
        recent: recentStudents
      }
    });

  } catch (error) {
    console.error("❌ Stats error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}