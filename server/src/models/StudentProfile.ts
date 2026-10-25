import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudentProfile extends Document {
  userId: Types.ObjectId;
  rollNumber: string;
  department: string;
  semester: number;
  currentGpa: number;
  attendancePercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const studentProfileSchema = new Schema<IStudentProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
      index: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Semester must be between 1 and 8'],
      max: [8, 'Semester must be between 1 and 8'],
    },
    currentGpa: {
      type: Number,
      default: 0.0,
      min: [0.0, 'GPA cannot be less than 0.0'],
      max: [10.0, 'GPA cannot exceed 10.0'],
    },
    attendancePercentage: {
      type: Number,
      default: 0,
      min: [0, 'Attendance cannot be less than 0%'],
      max: [100, 'Attendance cannot exceed 100%'],
    },
  },
  {
    timestamps: true,
  }
);

export const StudentProfile =
  (mongoose.models.StudentProfile as mongoose.Model<IStudentProfile>) ||
  mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
