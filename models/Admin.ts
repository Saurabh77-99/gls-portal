import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string; // hashed
  role: string;
  college: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      required: true, 
      default: "admin",
      enum: ["admin", "super_admin"]
    },
    college: { 
      type: String, 
      required: true, 
      trim: true 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster login
AdminSchema.index({ username: 1 });

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);