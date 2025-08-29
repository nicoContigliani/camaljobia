import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUserProfile extends Document {
  user: Types.ObjectId;
  fullname: string;
  email: string;
  phone: string;
  repository: string;
  linkedin: string;
  portfolio: string;
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  repository: {
    type: String,
    default: '',
    trim: true
  },
  linkedin: {
    type: String,
    default: '',
    trim: true
  },
  portfolio: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userProfileSchema.pre<IUserProfile>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

userProfileSchema.index({ user: 1 });
// userProfileSchema.index({ email: 1 });
userProfileSchema.index({ createdAt: -1 });

export default mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', userProfileSchema);