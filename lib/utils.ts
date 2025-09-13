import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export const getAuthToken = (request: NextRequest): string | null => {
  return request.cookies.get("authToken")?.value || null;
};

export const validateAuthentication = (request: NextRequest) => {
  const token = getAuthToken(request);
  
  if (!token) {
    return { isValid: false, error: "Access denied. No token provided." };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return { isValid: false, error: "Invalid or expired token." };
  }

  return { isValid: true, user: decoded };
};

interface Student {
  toObject?: () => Record<string, unknown>;
  [key: string]: unknown;
}

export const sanitizeStudent = (student: Student) => {
  const { __v, ...sanitized } = student.toObject ? student.toObject() : student;
  return sanitized;
};

type StudentFilter = {
  specialization?: { $regex: string; $options: string };
  cgpa?: { $gte?: number; $lte?: number };
  tags?: { $in: string[] };
  skills?: { $in: string[] };
  branch?: { $regex: string; $options: string };
  batch?: string;
  semester?: number;
};

export const buildStudentFilter = (searchParams: URLSearchParams) => {
  const filter: StudentFilter = {};

  const specialization = searchParams.get("specialization");
  const cgpa_gte = searchParams.get("cgpa_gte");
  const cgpa_lte = searchParams.get("cgpa_lte");
  const tags = searchParams.get("tags");
  const skills = searchParams.get("skills");
  const branch = searchParams.get("branch");
  const batch = searchParams.get("batch");
  const semester = searchParams.get("semester");

  if (specialization) {
    filter.specialization = { $regex: specialization, $options: "i" };
  }

  if (cgpa_gte || cgpa_lte) {
    filter.cgpa = {};
    if (cgpa_gte) filter.cgpa.$gte = parseFloat(cgpa_gte);
    if (cgpa_lte) filter.cgpa.$lte = parseFloat(cgpa_lte);
  }

  if (tags) {
    const tagArray = tags.split(",").map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }

  if (skills) {
    const skillArray = skills.split(",").map(skill => skill.trim());
    filter.skills = { $in: skillArray };
  }

  if (branch) {
    filter.branch = { $regex: branch, $options: "i" };
  }

  if (batch) {
    filter.batch = batch;
  }

  if (semester) {
    filter.semester = parseInt(semester);
  }

  return filter;
};