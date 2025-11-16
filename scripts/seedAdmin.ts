import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import Admin from "../models/Admin";
import { hashPassword } from "../lib/auth";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("✅ MongoDB connected for admin seeding");
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Clear existing admin data
    console.log("🧹 Clearing existing admin data...");
    await Admin.deleteMany({});

    // Create admin users
    console.log("👤 Creating admin users...");
    
    const adminUsers = [
      {
        username: "admin",
        password: await hashPassword("admin123"),
        role: "super_admin",
        college: "GLS University"
      },
      {
        username: "placement_admin",
        password: await hashPassword("placement2024"),
        role: "admin", 
        college: "GLS University"
      }
    ];

    const createdAdmins = await Admin.insertMany(adminUsers);

    console.log("✅ Admin users created:");
    console.log("   Username: admin | Password: admin123 | Role: super_admin");
    console.log("   Username: placement_admin | Password: placement2024 | Role: admin");

    console.log("\n🎉 Admin seeding completed!");
    console.log(`📊 Total admins created: ${createdAdmins.length}`);

  } catch (error) {
    console.error("❌ Admin seeding failed:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("🚪 MongoDB connection closed");
  }
};

// Command line interface
const main = async () => {
  try {
    await seedAdmin();
    console.log("🎯 Admin seeding process completed");
    process.exit(0);
  } catch (error) {
    console.error("💥 Admin seeding process failed:", error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

export { seedAdmin };