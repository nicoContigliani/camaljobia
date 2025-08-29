import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISkillCategory extends Document {
  languages: string[];
  frameworks_libraries: string[];
  databases: string[];
  tools_environments: string[];
  methodologies: string[];
  security: string[];
  mobile: string[];
  analysis_management: string[];
  communication: string[];
}

export interface IWorkExperience extends Document {
  company: string;
  period: string;
  position: string;
  description: string[];
}

export interface ICurriculum extends Document {
  user: Types.ObjectId;
  profile: string;
  professional_summary: string;
  skills: ISkillCategory;
  work_experience: IWorkExperience[];
  createdAt: Date;
  updatedAt: Date;
}

const skillCategorySchema = new Schema<ISkillCategory>({
  languages: [{
    type: String,
    default: []
  }],
  frameworks_libraries: [{
    type: String,
    default: []
  }],
  databases: [{
    type: String,
    default: []
  }],
  tools_environments: [{
    type: String,
    default: []
  }],
  methodologies: [{
    type: String,
    default: []
  }],
  security: [{
    type: String,
    default: []
  }],
  mobile: [{
    type: String,
    default: []
  }],
  analysis_management: [{
    type: String,
    default: []
  }],
  communication: [{
    type: String,
    default: []
  }]
});

const workExperienceSchema = new Schema<IWorkExperience>({
  company: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: [{
    type: String,
    required: true
  }]
});

const curriculumSchema = new Schema<ICurriculum>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profile: {
    type: String,
    required: true,
    trim: true
  },
  professional_summary: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: skillCategorySchema,
    required: true
  },
  work_experience: [{
    type: workExperienceSchema,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

curriculumSchema.pre<ICurriculum>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

curriculumSchema.index({ user: 1 });
curriculumSchema.index({ profile: 'text', professional_summary: 'text' });
curriculumSchema.index({ createdAt: -1 });

export default mongoose.models.Curriculum || mongoose.model<ICurriculum>('Curriculum', curriculumSchema);