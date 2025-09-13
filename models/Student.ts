import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  branch: string;
  batch: string;
  semester: number;
  specialization: string;
  cgpa: number;
  achievements: string[];
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    links: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: number;
  }[];
  contact: {
    email: string;
    phone: string;
  };
  resumeUrl?: string;
  profilePhoto?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  links: [{ type: String }],
}, { _id: false });

const CertificationSchema = new Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: Number, required: true },
}, { _id: false });

const ContactSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, trim: true, index: true },
    branch: { type: String, required: true, trim: true, index: true },
    batch: { type: String, required: true, trim: true, index: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    specialization: { type: String, required: true, trim: true, index: true },
    cgpa: { type: Number, required: true, min: 0, max: 10, index: true },
    achievements: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true, index: true }],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    contact: { type: ContactSchema, required: true },
    resumeUrl: { type: String, trim: true },
    profilePhoto: { type: String, trim: true },
    tags: [{ type: String, trim: true, index: true }],
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

StudentSchema.index({ 
  name: "text", 
  skills: "text", 
  specialization: "text",
  achievements: "text"
});
StudentSchema.index({ cgpa: -1, specialization: 1 });
StudentSchema.index({ tags: 1, branch: 1 });
StudentSchema.index({ batch: 1, semester: 1 });

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);