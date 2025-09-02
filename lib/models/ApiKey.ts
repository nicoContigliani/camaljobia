import mongoose, { Document, Schema } from 'mongoose';

export interface IApiKey extends Document {
  userId: string;
  name: string;
  encryptedKey: string;
  created: Date;
  lastUsed?: Date;
}

const ApiKeySchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  encryptedKey: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastUsed: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema);