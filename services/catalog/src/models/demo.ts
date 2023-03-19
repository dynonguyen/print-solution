// EXAMPLE: remove this file
import { Model, model, Schema } from 'mongoose';
import Demo from '~/types/entities/Demo';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const DemoModel: Model<Demo> = model<Demo>('Demo', schema, 'demos');

export default DemoModel;
