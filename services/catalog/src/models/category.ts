import { Model, model, Schema } from 'mongoose';
import MODEL_NAMES from '~/constants/model-name';
import { MAX } from '~/constants/validation';
import Category from '~/types/entities/Category';

const schema: Schema = new Schema<Category>({
  name: { type: String, required: true, maxlength: MAX.CATEGORY_NAME },
  photo: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

const CategoryModel: Model<Category> = model<Category>(MODEL_NAMES.CATEGORY, schema, 'categories');

export default CategoryModel;
