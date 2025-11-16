import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/models/Student";
import { validateAdminAuthentication, parseStudentData, validateStudentData, RawStudentData } from "@/lib/utils";
import * as XLSX from "xlsx";

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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const clearExisting = formData.get('clearExisting') === 'true';

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Check file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      return NextResponse.json(
        { success: false, error: "Please upload an Excel file (.xlsx or .xls)" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Read Excel file
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (rawData.length === 0) {
      return NextResponse.json(
        { success: false, error: "No data found in Excel file" },
        { status: 400 }
      );
    }

    // Clear existing data if requested
    if (clearExisting) {
      await Student.deleteMany({});
    }

    // Process students
    interface ImportError {
      row: number;
      name: string;
      errors: string[];
    }

    const results = {
      total: rawData.length,
      processed: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [] as ImportError[]
    };

    for (let i = 0; i < rawData.length; i++) {
      try {
        const row = rawData[i];
        
        // Parse and validate student data
        const studentData = parseStudentData(row as RawStudentData);
        const validation = validateStudentData(studentData);
        
        if (!validation.isValid) {
          results.errors.push({
            row: i + 1,
            name: studentData.name || 'Unknown',
            errors: validation.errors
          });
          results.skipped++;
          continue;
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({
          $or: [
            { 'contact.email': studentData.contact.email },
            { name: studentData.name, batch: studentData.batch }
          ]
        });

        if (existingStudent) {
          // Update existing student
          await Student.findByIdAndUpdate(existingStudent._id, studentData, {
            new: true,
            runValidators: true
          });
          results.updated++;
        } else {
          // Create new student
          await Student.create(studentData);
          results.created++;
        }

        results.processed++;

      } catch (error) {
        results.errors.push({
          row: i + 1,
          name: (rawData[i] as { Name?: string; name?: string }).Name || (rawData[i] as { Name?: string; name?: string }).name || 'Unknown',
          errors: [error instanceof Error ? error.message : String(error)]
        });
        results.skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Excel import completed",
      data: results
    });

  } catch (error) {
    console.error("❌ Excel import error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
