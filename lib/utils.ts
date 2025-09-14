import { NextRequest } from "next/server";
import { verifyToken, verifyAdminToken } from "./auth";

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

export const getAdminToken = (request: NextRequest): string | null => {
  return request.cookies.get("adminToken")?.value || null;
};

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

// Add admin authentication validation
export const validateAdminAuthentication = (request: NextRequest) => {
  // Method 1: Check for admin API key in headers (for API access)
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey && adminKey === process.env.ADMIN_API_KEY) {
    return { isValid: true, admin: true, method: "api-key" };
  }

  // Method 2: Check for admin JWT token (for web dashboard)
  const token = getAdminToken(request);
  if (token) {
    const decoded = verifyAdminToken(token);
    if (decoded) {
      return { isValid: true, admin: decoded, method: "jwt" };
    }
  }

  return { isValid: false, error: "Admin access denied. Invalid credentials." };
};

export interface RawStudentData {
  Name?: string;
  name?: string;
  Branch?: string;
  branch?: string;
  Batch?: string;
  batch?: string;
  Semester?: string | number;
  semester?: string | number;
  Specialization?: string;
  specialization?: string;
  CGPA?: string | number;
  cgpa?: string | number;
  Achievements?: string;
  achievements?: string;
  Skills?: string;
  skills?: string;
  Experience?: string;
  'Experience Role'?: string;
  'Experience Duration'?: string;
  'Experience Description'?: string;
  Projects?: string;
  'Project Description'?: string;
  'Project Tech'?: string;
  'Project Links'?: string;
  Certifications?: string;
  'Certification Issuer'?: string;
  'Certification Year'?: string | number;
  Email?: string;
  email?: string;
  Phone?: string;
  phone?: string;
  'Resume URL'?: string;
  resumeUrl?: string;
  'Resume Link'?: string;
  'Profile Photo'?: string;
  profilePhoto?: string;
  Tags?: string;
  tags?: string;
}

// Helper function to parse CSV/Excel data
export const parseStudentData = (rawData: RawStudentData) => {
  return {
    name: rawData.Name || rawData.name,
    branch: rawData.Branch || rawData.branch,
    batch: rawData.Batch || rawData.batch,
    semester: parseInt(String(rawData.Semester || rawData.semester)) || 1,
    specialization: rawData.Specialization || rawData.specialization,
    cgpa: parseFloat(String(rawData.CGPA || rawData.cgpa)) || 0,
    achievements: (rawData.Achievements || rawData.achievements || "")
      .toString().split(",").map((a: string) => a.trim()).filter(Boolean),
    skills: (rawData.Skills || rawData.skills || "")
      .toString().split(",").map((s: string) => s.trim()).filter(Boolean),
    experience: rawData.Experience ? [{
      company: rawData.Experience,
      role: rawData["Experience Role"] || "Intern",
      duration: rawData["Experience Duration"] || "3 months",
      description: rawData["Experience Description"] || ""
    }] : [],
    projects: rawData.Projects ? [{
      title: rawData.Projects,
      description: rawData["Project Description"] || "",
      techStack: (rawData["Project Tech"] || "").toString()
        .split(",").map((t: string) => t.trim()).filter(Boolean),
      links: (rawData["Project Links"] || "").toString()
        .split(",").map((l: string) => l.trim()).filter(Boolean)
    }] : [],
    certifications: rawData.Certifications ? [{
      name: rawData.Certifications,
      issuer: rawData["Certification Issuer"] || "Unknown",
      year: parseInt(String(rawData["Certification Year"])) || new Date().getFullYear()
    }] : [],
    contact: {
      email: rawData.Email || rawData.email || "",
      phone: rawData.Phone || rawData.phone || ""
    },
    resumeUrl: rawData["Resume URL"] || rawData.resumeUrl || rawData["Resume Link"] || "",
    profilePhoto: rawData["Profile Photo"] || rawData.profilePhoto || "",
    tags: (rawData.Tags || rawData.tags || "").toString()
      .split(",").map((t: string) => t.trim()).filter(Boolean)
  };
};

// Validate student data before saving
interface StudentData {
  name?: string;
  branch?: string;
  batch?: string;
  specialization?: string;
  cgpa?: number;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export const validateStudentData = (student: StudentData) => {
  const errors: string[] = [];

  if (!student.name) errors.push("Name is required");
  if (!student.branch) errors.push("Branch is required");
  if (!student.batch) errors.push("Batch is required");
  if (!student.specialization) errors.push("Specialization is required");
  if (!student.contact?.email) errors.push("Email is required");
  if (!student.cgpa || student.cgpa < 0 || student.cgpa > 10) {
    errors.push("Valid CGPA (0-10) is required");
  }

  // Email format validation
  if (student.contact?.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(student.contact.email)) {
      errors.push("Invalid email format");
    }
  }

  // Phone format validation (basic)
  if (student.contact?.phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(student.contact.phone.replace(/[\s\-\(\)]/g, ""))) {
      errors.push("Invalid phone format");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility to generate unique student ID
export const generateStudentId = (name: string, batch: string): string => {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const cleanBatch = batch.replace(/[^0-9]/g, "");
  const timestamp = Date.now().toString(36);
  return `${cleanName}_${cleanBatch}_${timestamp}`.substring(0, 20);
};

// Utility to sanitize file names
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
};