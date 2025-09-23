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

export const validateAdminAuthentication = (request: NextRequest) => {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey && adminKey === process.env.ADMIN_API_KEY) {
    return { isValid: true, admin: true, method: "api-key" };
  }
  const token = getAdminToken(request);
  if (token) {
    const decoded = verifyAdminToken(token);
    if (decoded) {
      return { isValid: true, admin: decoded, method: "jwt" };
    }
  }
  return { isValid: false, error: "Admin access denied. Invalid credentials." };
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
  languagesKnown?: { $in: string[] };
  "preferences.location"?: { $in: string[] };
  "preferences.jobType"?: { $in: string[] };
  "socialLinks.github"?: { $exists: boolean };
  "socialLinks.linkedin"?: { $exists: boolean };
};

export const buildStudentFilter = (
  searchParams: URLSearchParams
): StudentFilter => {
  const filter: StudentFilter = {};

  const specialization = searchParams.get("specialization");
  const cgpa_gte = searchParams.get("cgpa_gte");
  const cgpa_lte = searchParams.get("cgpa_lte");
  const tags = searchParams.get("tags");
  const skills = searchParams.get("skills");
  const branch = searchParams.get("branch");
  const batch = searchParams.get("batch");
  const semester = searchParams.get("semester");
  const languages = searchParams.get("languages");
  const location = searchParams.get("location");
  const jobType = searchParams.get("jobType");
  const hasGithub = searchParams.get("hasGithub");
  const hasLinkedin = searchParams.get("hasLinkedin");

  if (specialization) {
    filter.specialization = { $regex: specialization, $options: "i" };
  }

  if (cgpa_gte || cgpa_lte) {
    filter.cgpa = {};
    if (cgpa_gte) filter.cgpa.$gte = parseFloat(cgpa_gte);
    if (cgpa_lte) filter.cgpa.$lte = parseFloat(cgpa_lte);
  }

  if (tags) {
    const tagArray = tags.split(",").map((tag) => tag.trim());
    filter.tags = { $in: tagArray };
  }

  if (skills) {
    const skillArray = skills.split(",").map((skill) => skill.trim());
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

  if (languages) {
    const languageArray = languages.split(",").map((lang) => lang.trim());
    filter.languagesKnown = { $in: languageArray };
  }

  if (location) {
    const locationArray = location.split(",").map((loc) => loc.trim());
    filter["preferences.location"] = { $in: locationArray };
  }

  if (jobType) {
    const jobTypeArray = jobType.split(",").map((type) => type.trim());
    filter["preferences.jobType"] = { $in: jobTypeArray };
  }

  if (hasGithub === "true") {
    filter["socialLinks.github"] = { $exists: true };
  }

  if (hasLinkedin === "true") {
    filter["socialLinks.linkedin"] = { $exists: true };
  }

  return filter;
};

// Add admin authentication validation
// export const validateAdminAuthentication = (request: NextRequest) => {
//   // Method 1: Check for admin API key in headers (for API access)
//   const adminKey = request.headers.get("x-admin-key");
//   if (adminKey && adminKey === process.env.ADMIN_API_KEY) {
//     return { isValid: true, admin: true, method: "api-key" };
//   }

//   // Method 2: Check for admin JWT token (for web dashboard)
//   const token = getAdminToken(request);
//   if (token) {
//     const decoded = verifyAdminToken(token);
//     if (decoded) {
//       return { isValid: true, admin: decoded, method: "jwt" };
//     }
//   }

//   return { isValid: false, error: "Admin access denied. Invalid credentials." };
// };

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
  "Previous Semester CGPA"?: string | number;
  previousSemesterCgpa?: string | number;
  Achievements?: string;
  achievements?: string;
  "Achievement Descriptions"?: string;
  Skills?: string;
  skills?: string;
  Experience?: string;
  "Experience Role"?: string;
  "Experience Duration"?: string;
  "Experience Description"?: string;
  "Experience Certificate"?: string;
  Projects?: string;
  "Project Description"?: string;
  "Project Tech"?: string;
  "Project Links"?: string;
  "Project GitHub"?: string;
  "Project Live Preview"?: string;
  Certifications?: string;
  "Certification Issuer"?: string;
  "Certification Year"?: string | number;
  "Certification Link"?: string;
  "Research Publications"?: string;
  "Research Journal"?: string;
  "Research Year"?: string | number;
  "Research Authors"?: string;
  "Research Paper URL"?: string;
  Email?: string;
  email?: string;
  Phone?: string;
  phone?: string;
  GitHub?: string;
  github?: string;
  LinkedIn?: string;
  linkedin?: string;
  Portfolio?: string;
  portfolio?: string;
  "Resume URL"?: string;
  resumeUrl?: string;
  "Resume Link"?: string;
  "Profile Photo"?: string;
  profilePhoto?: string;
  Tags?: string;
  tags?: string;
  "Languages Known"?: string;
  languagesKnown?: string;
  "Preferred Location"?: string;
  "Preferred Job Type"?: string;
  "Preferred Role"?: string;
  "Preferred Industries"?: string;
  Overview?: string;
  overview?: string;
}

const splitAndTrim = (str: string | undefined, delimiter = ","): string[] => {
  if (!str) return [];
  return str
    .toString()
    .split(delimiter)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseObjectArray = <T>(
  keys: (keyof RawStudentData)[],
  rawData: RawStudentData,
  constructor: (parts: string[]) => T
): T[] => {
  const firstFieldValue = rawData[keys[0]];
  if (!firstFieldValue) return [];

  const arrays = keys.map((key) => splitAndTrim(rawData[key]?.toString(), "|"));
  const numItems = Math.max(...arrays.map((arr) => arr.length));
  if (numItems === 0) return [];

  const result: T[] = [];
  for (let i = 0; i < numItems; i++) {
    const parts = arrays.map((arr) => arr[i] || "");
    result.push(constructor(parts));
  }
  return result;
};

// Helper function to parse CSV/Excel data
export const parseStudentData = (rawData: RawStudentData) => {
  return {
    name: rawData.Name || rawData.name,
    branch: rawData.Branch || rawData.branch,
    batch: rawData.Batch || rawData.batch,
    semester: parseInt(String(rawData.Semester || rawData.semester)) || 1,
    specialization: rawData.Specialization || rawData.specialization,
    cgpa: parseFloat(String(rawData.CGPA || rawData.cgpa)) || 0,
    previousSemesterCgpa:
      parseFloat(
        String(
          rawData["Previous Semester CGPA"] || rawData.previousSemesterCgpa
        )
      ) || undefined,

    achievements: parseAchievements(
      rawData.Achievements || rawData.achievements || "", 
      rawData['Achievement Descriptions']
    ),

    skills: splitAndTrim(rawData.Skills || rawData.skills),

    experience: parseObjectArray(
      [
        "Experience",
        "Experience Role",
        "Experience Duration",
        "Experience Description",
        "Experience Certificate",
      ],
      rawData,
      ([company, role, duration, description, certificate]) => ({
        company,
        role,
        duration,
        description,
        certificate,
      })
    ),

    projects: parseObjectArray(
      [
        "Projects",
        "Project Description",
        "Project Tech",
        "Project GitHub",
        "Project Live Preview",
      ],
      rawData,
      ([title, description, tech, githubUrl, livePreview]) => ({
        title,
        description,
        techStack: splitAndTrim(tech),
        githubUrl,
        livePreview,
      })
    ),

    certifications: parseObjectArray(
      [
        "Certifications",
        "Certification Issuer",
        "Certification Year",
        "Certification Link",
      ],
      rawData,
      ([name, issuer, year, certificate]) => ({
        name,
        issuer,
        year: parseInt(year) || new Date().getFullYear(),
        certificate,
      })
    ),

    researchPublications: parseObjectArray(
      [
        "Research Publications",
        "Research Journal",
        "Research Year",
        "Research Authors",
        "Research Paper URL",
      ],
      rawData,
      ([title, journal, year, authors, paperUrl]) => ({
        title,
        journal,
        year: parseInt(year) || new Date().getFullYear(),
        authors: splitAndTrim(authors),
        paperUrl,
      })
    ),

    contact: {
      email: rawData.Email || rawData.email || "",
      phone: rawData.Phone || rawData.phone || "",
    },
    socialLinks: {
      github: rawData.GitHub || rawData.github || undefined,
      linkedin: rawData.LinkedIn || rawData.linkedin || undefined,
      portfolio: rawData.Portfolio || rawData.portfolio || undefined,
    },
    resumeUrl:
      rawData["Resume URL"] ||
      rawData.resumeUrl ||
      rawData["Resume Link"] ||
      "",
    profilePhoto: rawData["Profile Photo"] || rawData.profilePhoto || "",
    tags: splitAndTrim(rawData.Tags || rawData.tags),
    languagesKnown: splitAndTrim(
      rawData["Languages Known"] || rawData.languagesKnown
    ),
    preferences: {
      location: splitAndTrim(rawData["Preferred Location"]),
      jobType: splitAndTrim(rawData["Preferred Job Type"]),
      role: splitAndTrim(rawData["Preferred Role"]),
      industries: splitAndTrim(rawData["Preferred Industries"]),
    },
    overview: rawData.Overview || rawData.overview || "",
  };
};

const parseAchievements = (
  achievementsStr: string,
  descriptionsStr?: string
) => {
  const achievements = achievementsStr
    .toString()
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const descriptions =
    descriptionsStr
      ?.toString()
      .split("|")
      .map((d) => d.trim())
      .filter(Boolean) || [];

  return achievements.map((title, index) => ({
    title,
    description: descriptions[index] || `Achievement: ${title}`,
    date: undefined,
    certificate: undefined,
  }));
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
    errors,
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
