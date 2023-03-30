import { Model, model, Schema } from 'mongoose';
import MODEL_NAMES from '~/constants/model-name';
import { MAX } from '~/constants/validation';
import Product from '~/types/entities/Product';

const schema: Schema = new Schema<Product>({
  name: { type: String, required: true, maxlength: MAX.PRODUCT_NAME },
  categoryId: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.CATEGORY, required: true },
  htmlDesc: { type: String, required: true, default: '' },
  photo: { type: String, required: true, default: '' },
  price: { type: Number, required: true, default: 0 },
  numOfFavorites: { type: Number, required: true, default: 0 },
  numOfViews: { type: Number, required: true, default: 0 },
  infos: { type: [{ label: String, value: String }], default: [] },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

const ProductModel: Model<Product> = model<Product>(MODEL_NAMES.PRODUCT, schema, 'products');

export default ProductModel;
