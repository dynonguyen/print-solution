import { Model, model, Schema } from 'mongoose';
import MODEL_NAMES from '~/constants/model-name';
import { MAX } from '~/constants/validation';
import Category from '~/types/entities/Category';

const schema: Schema = new Schema<Category>({
  name: { type: String, required: true, maxlength: MAX.CATEGORY_NAME, unique: true },
  photo: { type: String, required: true },
  numOfProducts: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

const CategoryModel: Model<Category> = model<Category>(MODEL_NAMES.CATEGORY, schema, 'categories');

export default CategoryModel;
