export interface Student {
  _id: string;
  name: string;
  branch: string;
  batch: string;
  semester: number;
  specialization: string;
  cgpa: number;
  achievements: string[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  contact: Contact;
  resumeUrl?: string;
  profilePhoto?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  links: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Recruiter {
  _id: string;
  company: string;
  accessCode: string;
  validTill: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenPayload {
  recruiterId: string;
  company: string;
  iat: number;
  exp: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Admin {
  _id: string;
  username: string;
  password: string;
  role: "admin" | "super_admin";
  college: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminTokenPayload {
  adminId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ImportResult {
  total: number;
  processed: number;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{
    row: number;
    name: string;
    errors: string[];
  }>;
}