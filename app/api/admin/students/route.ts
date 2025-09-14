import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAdminAuthentication } from "@/lib/utils";

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

    // Validate required fields
    const requiredFields = [
      "name",
      "branch",
      "batch",
      "semester",
      "specialization",
      "cgpa",
      "contact",
    ];
    for (const field of requiredFields) {
      if (!studentData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const student = new Student(studentData);
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("❌ Create student error:", error);
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

    for (let i = 0; i < students.length; i++) {
      try {
        const studentData = students[i];

        // Check if student exists by email or name+batch
        const existingStudent = await Student.findOne({
          $or: [
            { "contact.email": studentData.contact?.email },
            { name: studentData.name, batch: studentData.batch },
          ],
        });

        if (existingStudent) {
          // Update existing student
          await Student.findByIdAndUpdate(existingStudent._id, studentData);
          results.updated++;
        } else {
          // Create new student
          await Student.create(studentData);
          results.created++;
        }
      } catch (error) {
        results.errors.push({
          index: i,
          student: students[i].name || "Unknown",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

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
