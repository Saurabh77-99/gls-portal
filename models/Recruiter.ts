import mongoose, { Schema, Document } from "mongoose";

export interface IRecruiter extends Document {
  company: string;
  accessCode: string;
  validTill: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RecruiterSchema = new Schema<IRecruiter>(
  {
    company: { 
      type: String, 
      required: true, 
      trim: true 
    },
    accessCode: { 
      type: String, 
      required: true 
    },
    validTill: { 
      type: Date, 
      required: true,
      index: true
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster access code validation
RecruiterSchema.index({ validTill: 1 });

export default mongoose.models.Recruiter || mongoose.model<IRecruiter>("Recruiter", RecruiterSchema);