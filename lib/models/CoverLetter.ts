import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICoverLetter extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
  company?: string;
  position?: string;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const coverLetterSchema = new Schema<ICoverLetter>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 160000 
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  position: {
    type: String,
    trim: true,
    default: ''
  },
  isTemplate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

coverLetterSchema.index({ user: 1 });
coverLetterSchema.index({ title: 'text', content: 'text' });
coverLetterSchema.index({ isTemplate: 1 });
coverLetterSchema.index({ createdAt: -1 });

export default mongoose.models.CoverLetter || mongoose.model<ICoverLetter>('CoverLetter', coverLetterSchema);