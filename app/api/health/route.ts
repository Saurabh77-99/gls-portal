import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import Recruiter from "@/models/Recruiter";

export async function GET() {
  try {
    await connectDB();

    const [studentCount, recruiterCount] = await Promise.all([
      Student.countDocuments(),
      Recruiter.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      message: "Server is healthy",
      data: {
        timestamp: new Date().toISOString(),
        database: "connected",
        stats: {
          students: studentCount,
          recruiters: recruiterCount
        },
        version: "1.0.0"
      }
    });

  } catch (error) {
    console.error("❌ Health check failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Database connection failed",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}