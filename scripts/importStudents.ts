import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import * as XLSX from "xlsx";
import Student from "../models/Student";
import { parseStudentData, validateStudentData, RawStudentData } from "../lib/utils";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("✅ MongoDB connected for import");
};

interface ImportOptions {
  filePath: string;
  sheetName?: string;
  skipRows?: number;
  clearExisting?: boolean;
  dryRun?: boolean;
}

const importStudentsFromExcel = async (options: ImportOptions) => {
  try {
    await connectDB();

    const { filePath, sheetName, skipRows = 0, clearExisting = false, dryRun = false } = options;

    // Check if file exists
    const fullPath = path.resolve(process.cwd(), filePath);
    console.log(`📂 Reading Excel file: ${fullPath}`);

    // Read Excel file
    const workbook = XLSX.readFile(fullPath);
    const sheet = sheetName || workbook.SheetNames[0];
    
    if (!workbook.Sheets[sheet]) {
      throw new Error(`Sheet "${sheet}" not found. Available sheets: ${workbook.SheetNames.join(", ")}`);
    }

    console.log(`📊 Using sheet: ${sheet}`);
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
      range: skipRows
    });

    console.log(`📋 Found ${rawData.length} rows in Excel`);

    if (rawData.length === 0) {
      throw new Error("No data found in Excel file");
    }

    // Show sample headers for verification
    console.log("📝 Sample headers found:", Object.keys(rawData[0] as object));

    // Clear existing data if requested
    if (clearExisting && !dryRun) {
      console.log("🧹 Clearing existing student data...");
      await Student.deleteMany({});
      console.log("✅ Existing data cleared");
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
        const row = rawData[i] as { Name?: string; name?: string };
        console.log(`\n🔄 Processing row ${i + 1}/${rawData.length}: ${row.Name || row.name || 'Unknown'}`);

        // Parse student data
        const studentData = parseStudentData(row as RawStudentData);

        // Validate data
        const validation = validateStudentData(studentData);
        if (!validation.isValid) {
          results.errors.push({
            row: i + 1,
            name: studentData.name || 'Unknown',
            errors: validation.errors
          });
          results.skipped++;
          console.log(`❌ Validation failed: ${validation.errors.join(", ")}`);
          continue;
        }

        if (dryRun) {
          console.log(`✅ Would process: ${studentData.name} (${studentData.branch})`);
          results.processed++;
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
          console.log(`🔄 Updated existing student: ${studentData.name}`);
        } else {
          // Create new student
          await Student.create(studentData);
          results.created++;
          console.log(`✅ Created new student: ${studentData.name}`);
        }

        results.processed++;

      } catch (error) {
        results.errors.push({
          row: i + 1,
          name: (rawData[i] as { Name?: string; name?: string }).Name || (rawData[i] as { Name?: string; name?: string }).name || 'Unknown',
          errors: [error instanceof Error ? error.message : String(error)]
        });
        results.skipped++;
        console.log(`❌ Error processing row ${i + 1}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Print summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 IMPORT SUMMARY");
    console.log("=".repeat(50));
    console.log(`📋 Total rows in Excel: ${results.total}`);
    console.log(`✅ Successfully processed: ${results.processed}`);
    console.log(`🆕 Created: ${results.created}`);
    console.log(`🔄 Updated: ${results.updated}`);
    console.log(`⚠️  Skipped: ${results.skipped}`);
    console.log(`❌ Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
      console.log("\n❌ Error Details:");
      results.errors.forEach(error => {
        console.log(`   Row ${error.row} (${error.name}): ${error.errors.join(", ")}`);
      });
    }

    console.log("\n🎉 Import completed!");

    return results;

  } catch (error) {
    console.error("💥 Import failed:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("🚪 MongoDB connection closed");
  }
};

// Command line interface
const main = async () => {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📖 Usage: npm run import-students <excel-file> [options]

Examples:
  npm run import-students students.xlsx
  npm run import-students data/students.xlsx --sheet="Sheet1" --clear
  npm run import-students students.xlsx --dry-run

Options:
  --sheet=<name>     Specify sheet name (default: first sheet)
  --skip=<rows>      Skip first N rows (default: 0)
  --clear            Clear existing data before import
  --dry-run          Preview import without saving to database
    `);
    process.exit(1);
  }

  const filePath = args[0];
  const options: ImportOptions = { filePath };

  // Parse command line options
  args.slice(1).forEach(arg => {
    if (arg.startsWith('--sheet=')) {
      options.sheetName = arg.split('=')[1];
    } else if (arg.startsWith('--skip=')) {
      options.skipRows = parseInt(arg.split('=')[1]) || 0;
    } else if (arg === '--clear') {
      options.clearExisting = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    }
  });

  if (options.dryRun) {
    console.log("🔍 DRY RUN MODE - No data will be saved to database");
  }

  if (options.clearExisting) {
    console.log("⚠️  WARNING: Existing student data will be cleared!");
  }

  try {
    await importStudentsFromExcel(options);
    process.exit(0);
  } catch (error) {
    console.error("💥 Script failed:", error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

export { importStudentsFromExcel };