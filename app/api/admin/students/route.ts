import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAdminAuthentication } from "@/lib/utils";
import mongoose from "mongoose";

// CREATE new student
export async function POST(request: NextRequest) {
  try {
    const auth = validateAdminAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();
    const studentData = await request.json();

    const student = new Student(studentData);
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("❌ Create student error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// BULK CREATE students
export async function PUT(request: NextRequest) {
  try {
    const auth = validateAdminAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();
    const { students } = await request.json();

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid students array" },
        { status: 400 }
      );
    }

    const results = {
      created: 0,
      updated: 0,
      errors: [] as Array<{ index: number; student: string; error: string }>,
    };

    await Promise.all(students.map(async (studentData, i) => {
      try {
        // Validate required fields for this specific student before DB query
        if (!studentData.name || !studentData.batch || !studentData.contact?.email) {
           throw new Error("Missing required fields: name, batch, and contact.email are required to identify a student.");
        }

        const existingStudent = await Student.findOne({
           // Using email as the primary unique identifier
          "contact.email": studentData.contact.email,
        });

        if (existingStudent) {
          await Student.findByIdAndUpdate(existingStudent._id, studentData, { runValidators: true });
          results.updated++;
        } else {
          await Student.create(studentData);
          results.created++;
        }
      } catch (error) {
        results.errors.push({
          index: i,
          student: studentData.name || "Unknown",
          error: error instanceof Error ? error.message : "An unknown error occurred",
        });
      }
    }));

    return NextResponse.json({
      success: true,
      message: "Bulk import completed",
      data: results,
    });
  } catch (error) {
    console.error("❌ Bulk import error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
