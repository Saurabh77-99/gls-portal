import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAuthentication, sanitizeStudent } from "@/lib/utils";

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
    const query = searchParams.get("q") || searchParams.get("name");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 20);

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Search query is required" },
        { status: 400 }
      );
    }

    // Search by name (case-insensitive) and text search
    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { $text: { $search: query } }
      ]
    };

    const students = await Student.find(searchFilter)
      .limit(limit)
      .select("-__v")
      .sort({ cgpa: -1 }) // Sort by CGPA desc
      .lean();

    return NextResponse.json({
      success: true,
      data: students.map(sanitizeStudent),
      count: students.length,
      query: query.trim()
    });

  } catch (error) {
    console.error("❌ Search students error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}