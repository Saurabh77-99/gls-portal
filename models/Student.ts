import mongoose, { Schema, Document } from "mongoose";

const emailRegex = /^\S+@\S+\.\S+$/;
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export interface IStudent extends Document {
  name: string;
  branch: string;
  batch: string;
  semester: number;
  specialization: string;
  cgpa: number;
  previousSemesterCgpa: number;
  achievements: {
    title: string;
    description: string;
    date?: string;
    certificate?: string;
  }[];
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
    certificate?: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    links: string[];
    githubUrl?: string;
    livePreview?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: number;
    certificate?: string;
  }[];
  researchPublications: {
    title: string;
    journal?: string;
    year: number;
    authors?: string[];
    paperUrl?: string;
  }[];
  contact: {
    email: string;
    phone: string;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  resumeUrl?: string;
  profilePhoto?: string;
  tags: string[];
  languagesKnown: string[];
  preferences: {
    location: string[];
    jobType: string[];
    role: string[];
    industries: string[];
  };
  overview: string;
}

const AchievementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String },
    certificate: {
      type: String,
      match: [urlRegex, "Please enter a valid URL"],
    },
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    certificate: {
      type: String,
      match: [urlRegex, "Please enter a valid URL"],
    },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    links: [{ type: String, match: [urlRegex, "Please enter a valid URL"] }],
    githubUrl: { type: String, match: [urlRegex, "Please enter a valid URL"] },
    livePreview: {
      type: String,
      match: [urlRegex, "Please enter a valid URL"],
    },
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: Number, required: true },
    certificate: {
      type: String,
      match: [urlRegex, "Please enter a valid URL"],
    },
  },
  { _id: false }
);

const ResearchPublicationSchema = new Schema(
  {
    title: { type: String, required: true },
    journal: { type: String },
    year: { type: Number, required: true },
    authors: [{ type: String }],
    paperUrl: { type: String, match: [urlRegex, "Please enter a valid URL"] },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Please enter a valid email address"],
    },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const SocialLinksSchema = new Schema(
  {
    github: { type: String, match: [urlRegex, "Please enter a valid URL"] },
    linkedin: { type: String, match: [urlRegex, "Please enter a valid URL"] },
    portfolio: { type: String, match: [urlRegex, "Please enter a valid URL"] },
  },
  { _id: false }
);

const PreferencesSchema = new Schema(
  {
    location: [{ type: String }],
    jobType: [
      {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance", "Research", "Apprenticeship"],
      },
    ],
    role: [{ type: String }],
    industries: [{ type: String }],
  },
  { _id: false }
);

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, trim: true, index: true },
    branch: {
      type: String,
      required: true,
      trim: true,
      index: true,
      enum: [
        "Computer Science & Engineering",
        "AI/ML",
        "Data Science",
        "Cyber Security",
      ],
    },
    batch: { type: String, required: true, trim: true, index: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    specialization: { type: String, required: true, trim: true, index: true },
    cgpa: { type: Number, required: true, min: 0, max: 10, index: true },
    previousSemesterCgpa: { type: Number, min: 0, max: 10 },
    achievements: [AchievementSchema],
    skills: [{ type: String, trim: true, index: true }],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    researchPublications: [ResearchPublicationSchema],
    contact: { type: ContactSchema, required: true },
    socialLinks: { type: SocialLinksSchema, default: {} },
    resumeUrl: {
      type: String,
      trim: true,
      match: [urlRegex, "Please enter a valid URL"],
    },
    profilePhoto: {
      type: String,
      trim: true,
      match: [urlRegex, "Please enter a valid URL"],
    },
    tags: [{ type: String, trim: true, index: true }],
    languagesKnown: {
      type: [{ type: String, trim: true }],
      default: ["English"],
    },
    preferences: { type: PreferencesSchema, default: {} },
    overview: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

StudentSchema.index({
  name: "text",
  skills: "text",
  specialization: "text",
  overview: "text",
});
StudentSchema.index({ cgpa: -1, specialization: 1 });
StudentSchema.index({ tags: 1, branch: 1 });
StudentSchema.index({ batch: 1, semester: 1 });
StudentSchema.index({ "socialLinks.github": 1 });
StudentSchema.index({ "socialLinks.linkedin": 1 });

export default mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);
