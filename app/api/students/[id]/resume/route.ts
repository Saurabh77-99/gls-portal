import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAuthentication } from "@/lib/utils";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Validate authentication
    const auth = validateAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();

    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Validate MongoDB ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid student ID format" },
        { status: 400 }
      );
    }

    const student = await Student.findById(id)
      .select("name resumeUrl contact")
      .lean() as { name?: string; resumeUrl?: string; contact?: string } | null;

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    if (!student.resumeUrl) {
      return NextResponse.json(
        { success: false, error: "Resume not available for this student" },
        { status: 404 }
      );
    }

    // In production, you might want to:
    // 1. Proxy the file from cloud storage (S3, Cloudinary)
    // 2. Generate temporary signed URLs
    // 3. Log download activity for analytics
    // 4. Stream the file directly instead of redirecting

    return NextResponse.json({
      success: true,
      data: {
        resumeUrl: student.resumeUrl,
        studentName: student.name,
        downloadedBy: auth.user?.company,
        downloadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Resume download error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}