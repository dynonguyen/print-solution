import { Model, model, Schema } from 'mongoose';
import MODEL_NAMES from '~/constants/model-name';
import { MAX } from '~/constants/validation';
import Product from '~/types/entities/Product';

const schema: Schema = new Schema<Product>({
  uuid: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.CATEGORY, required: true },
  name: { type: String, required: true, maxlength: MAX.PRODUCT_NAME },
  photo: { type: String, required: true, default: '' },
  price: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true, default: '' },
  infos: { type: [{ label: String, value: String }], default: [] },
  options: { type: [{ optionType: String, label: String, values: [String] }], default: [] },
  htmlDesc: { type: String, default: '' },
  numOfFavorites: { type: Number, required: true, default: 0 },
  numOfViews: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

const ProductModel: Model<Product> = model<Product>(MODEL_NAMES.PRODUCT, schema, 'products');

export default ProductModel;
