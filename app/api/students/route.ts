import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAuthentication, buildStudentFilter, sanitizeStudent } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const auth = validateAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50); // Max 50 per page
    
    // Sorting
    const sortBy = searchParams.get("sortBy") || "cgpa";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Build filter
    const filter = buildStudentFilter(searchParams);

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort options
    const sortOptions: { [key: string]: "asc" | "desc" | 1 | -1 } = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute queries in parallel
    const [students, totalStudents] = await Promise.all([
      Student.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean(),
      Student.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalStudents / limit);
    
    return NextResponse.json({
      success: true,
      data: students.map(sanitizeStudent),
      pagination: {
        currentPage: page,
        totalPages,
        totalStudents,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        applied: Object.keys(filter).length > 0,
        count: Object.keys(filter).length
      }
    });

  } catch (error) {
    console.error("❌ Get students error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}