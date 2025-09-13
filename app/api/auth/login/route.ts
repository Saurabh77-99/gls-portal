import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Recruiter from "@/models/Recruiter";
import { verifyAccessCode, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { accessCode } = body;

    if (!accessCode || typeof accessCode !== "string") {
      return NextResponse.json(
        { success: false, error: "Access code is required" },
        { status: 400 }
      );
    }

    const recruiters = await Recruiter.find({
      validTill: { $gte: new Date() }
    });

    if (recruiters.length === 0) {
      return NextResponse.json(
        { success: false, error: "No active access codes found" },
        { status: 401 }
      );
    }

    let validRecruiter = null;
    for (const recruiter of recruiters) {
      const isValid = await verifyAccessCode(accessCode, recruiter.accessCode);
      if (isValid) {
        validRecruiter = recruiter;
        break;
      }
    }

    if (!validRecruiter) {
      return NextResponse.json(
        { success: false, error: "Invalid access code" },
        { status: 401 }
      );
    }

    const token = generateToken({
      recruiterId: validRecruiter._id.toString(),
      company: validRecruiter.company,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        company: validRecruiter.company,
        validTill: validRecruiter.validTill
      }
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}