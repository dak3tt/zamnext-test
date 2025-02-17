import { Document, model, Schema } from 'mongoose';

export interface Sites extends Document {
  title: string;
  image: string;
  link: string;
  created_at: Date;
}

const SiteSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: {type: String, required: true },
    link: {type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export default model<Sites>('Site', SiteSchema);